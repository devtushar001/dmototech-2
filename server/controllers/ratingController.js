import userModel from "../models/userModel.js";
import ratingModel from "../models/ratingModel.js";
import mongoose from "mongoose";

export const ratingAddController = async (req, res) => {
     try {
          const userId = req.user; // Assumes { id: 'ObjectId' }

          const { stars, message } = req.body;

          // Validate input
          if (!stars || stars < 1 || stars > 5) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid star rating. It should be between 1 and 5.",
               });
          }

          if (!message || message.trim().length === 0) {
               return res.status(400).json({
                    success: false,
                    message: "Message cannot be empty.",
               });
          }

          // Validate ID
          if (!mongoose.Types.ObjectId.isValid(userId.id)) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid user ID.",
               });
          }

          // Find user by ID
          const user = await userModel.findById(userId.id);
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: "User not found.",
               });
          }
          // Success response


          const ratings = await ratingModel.create({
               userName: user.name,
               stars: stars,
               message,
          });

          // Log the created rating


          return res.status(201).json({
               success: true,
               message: "User fetched successfully.",
               data: user,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "An error occurred.",
          });
     }
};


export const allRatingFetchController = async (req, res) => {
     try {
          const allRatings = await ratingModel.find({});

          if (!allRatings) {
               return res.status(501).json({
                    success: false,
                    message: `Problem in fetching all ratings.`
               })
          }

          return res.status(201).json({
               success: true,
               message: `All ratings fetched successfully`,
               allRatings
          })

     } catch (error) {
          return res.status(501).json({
               success: false,
               message: `Api got ${error}`
          })
     }
}