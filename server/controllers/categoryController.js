import categoryModel from "../models/categoryModel.js";
//import multer from 'multer'; // Import your Multer config

const addCategory = async (req, res) => {
    try {
        const { menu_name, menu_image } = req.body;

        if (!menu_name || !menu_image) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingCategory = await categoryModel.findOne({ menu_name });
        if (existingCategory) {
            return res.json({
                success: false,
                message: "Category already exists"
            });
        }

        const newCategory = new categoryModel({
            menu_name,
            menu_image
        });

        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            return res.json({
                success: false,
                message: "Failed to create category"
            });
        }

        return res.json({
            success: true,
            message: "Category created successfully",
            category: savedCategory
        });

    } catch (error) {
        console.error("Error in addCategory:", error);
        return res.json({
            success: false,
            message: `API Error: ${error.message || error}`
        });
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) return res.status(501).json({ success: false, message: "Categories not found" })
        return res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        console.log(req.body)
        const { catId } = req.body;
        const category = await categoryModel.findById(catId);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Delete the category
        await categoryModel.findByIdAndDelete(catId);

        // Success response
        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting category:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};



export { addCategory, getAllCategories, deleteCategory };