const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controller/employeeController.js");

employeeRouter.post("/employees/register", async (req, res) => {
    const {fullName, userName, email, password} = req.body;
    const employee = await employeeController.findEmployee({userName : userName});

    if(!employee){
        const newEmp = await employeeController.saveEmployee({fullName, userName, email, password});
        res.status(200).json({
            createdEmployee : newEmp,
            message : "Employee registered successfully",
            prompt : "You can see your tasks now!!"
        });
    }
    else{
        res.status(200).json({
            message : "Employee already exists with username : " + userName
        });    
    }
});

employeeRouter.put("/employees/:id", async (req, res) => {
    const {fullName, email} = req.body;
    const emp = await employeeController.findEmployee({id : req.params.id});

    if(emp){
        const updateEmp = await employeeController.updateEmployee({fullName, email},{id : req.params.id});
        res.status(200).json({
            Employee : updateEmp,
            message : "Employee updated successfully"
        });
    }else{
        res.status(404).json({
            message : "Employee not found with id : " + req.params.id
        });
    }
});

employeeRouter.get("/employees/:id", async (req, res) => {
    const id = req.params.id;
    const emp = await employeeController.findEmployeewithTasks({id : id});

    if(!emp){
        res.status(404).json({
            message : "No Employee Found"
        });
    }
    else{
        res.status(200).json({
            success : "ok",
            Employee : emp
        });    
    }
});

employeeRouter.get("/employees", async (req, res) => {
    const employees = await employeeController.findAllEmployees();
    if(!employees){
        res.status(404).json({
            message : "No Employees"
        });
    }
    res.status(200).json({
        success : "ok",
        employees
    });
});

employeeRouter.delete("/employees/:id", async (req, res) => {
    const id = req.params.id;
    const employee = await employeeController.deleteEmployee({id : id});
    if(employee){
        res.status(200).json({
            success : "ok",
            message : employee.userName + " deleted successfully:("
        });
    }
    else{
        res.status(404).json({
            message : "No Employee Found"
        });
    }
});

module.exports = employeeRouter;