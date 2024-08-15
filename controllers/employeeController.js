import Employee from "../models/employeeModel.js";
import Complaint from "../models/complaintModel.js";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";

export const fileComplaint = async (req, res) => {
  try {
    let { user_id, employeeName, position, comment, rating } = req.body;
    let employee = await Employee.findOne({
      name: employeeName,
      position: position,
    });

    if (!employee) {
      employee = new Employee({ name: employeeName, position });
      await employee.save();
    }

    employee.complaintCount += 1;
    rating = parseInt(rating);
    employee.ratingSum += rating;
    await employee.save();

    const complaint = new Complaint({
      user_id,
      employee_id: employee._id,
      comment,
      rating,
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint filed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCorrouptEmployees = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: req.body.userId });
    console.log(user.name);
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmployeeComplaints = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const complaints = await Complaint.find({ employee_id });
    // const response = complaints.map((complaint) => {
    //   return {
    //     comment: complaint.comment,
    //     rating: complaint.rating,
    //   };
    // });
    // console.log(response);
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const raiseTicket = async (req, res) => {
  try {
    const { employeeName, position, clarification } = req.body;
    const employee = await Employee.findOne({ name: employeeName, position });
    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }
    const ticket = new Ticket({
      employeeId: employee._id,
      employeeName,
      position,
      clarification,
    });
    await ticket.save();
    res.status(201).json({ message: "Ticket raised successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { employeeName, position } = req.body;
    const employee = await Employee.findOne({ name: employeeName, position });
    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }
    await employee.remove();
    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
