import Candidate from "../models/candidate.model.js";

export const createCandidate = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const candidate = await Candidate.create({
            name,
            email,
            role,
            resume: req.file?.path,
        });

        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteCandidate = async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Candidate deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};