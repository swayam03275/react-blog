import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"; // Importing custom components
import appwriteService from "../../appwrite/config"; // Importing Appwrite service for file uploads and CRUD operations
import { useNavigate } from "react-router-dom"; // Importing hook for navigation
import { useSelector } from "react-redux"; // Importing hook to access Redux store

export default function PostForm({ post }) {
  // Initializing form with react-hook-form and setting default values based on passed 'post' prop
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "", // Default title from post or empty string
      slug: post?.$id || "", // Default slug from post ID or empty string
      content: post?.content || "", // Default content from post or empty string
      status: post?.status || "active", // Default status from post or "active"
    },
  });

  const navigate = useNavigate(); // Hook to navigate programmatically
  const userData = useSelector((state) => state.auth.userData); // Accessing current user data from Redux store

  // Function to transform the title into a slug (URL-friendly)
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace non-alphanumeric characters with hyphen
        .replace(/\s/g, "-"); // Replace spaces with hyphens
    }
    return "";
  }, []);

  // Watching the "title" field to auto-generate the "slug" field when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true }); // Set slug value dynamically
      }
    });
    return () => subscription.unsubscribe(); // Clean up the subscription when component unmounts
  }, [watch, slugTransform, setValue]);

  // Submit function to handle form submission
  const submit = async (data) => {
    try {
      if (post) {
        // If editing an existing post
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0]) // Upload new image if provided
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredimage); // Delete old image if new one is uploaded
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: file ? file.$id : post.featuredimage, // Use new image if uploaded
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`); // Navigate to updated post page
        }
      } else {
        // If creating a new post
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0]) // Upload file if provided
          : null;

        if (!file) {
          console.error("No file uploaded");
          return;
        }

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: file.$id, // Use uploaded file as the featured image
          userid: userData?.$id, // Assign current user as the post creator
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`); // Navigate to new post page
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err); // Handle errors during submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)} // Handle form submission
      className="flex flex-wrap gap-6 bg-gradient-to-br from-[#f0f9ff] via-white to-[#fefce8] shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-200"
    >
      {/* Left section */}
      <div className="w-full md:w-2/3 space-y-6">
        <Input
          label="📝 Title :"
          placeholder="Enter post title..."
          className="mb-2 text-gray-800"
          {...register("title", { required: true })} // Register title input
        />

        <Input
          label="🔗 Slug :"
          placeholder="Auto-generated from title"
          className="mb-2 text-gray-800"
          {...register("slug", { required: true })} // Register slug input
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true, // Automatically update slug on title change
            })
          }
        />

        <div>
          <RTE
            label="📖 Content :"
            name="content"
            control={control} // Register content editor
            defaultValue={getValues("content")} // Set default value for RTE
          />
        </div>
      </div>

      {/* Right section */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="bg-white border border-dashed border-indigo-300 rounded-2xl p-4 shadow-lg hover:shadow-indigo-200 transition">
          <Input
            label="📷 Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })} // Register image input, make it required for new posts
          />

          {/* Display current image if editing an existing post */}
          {post ? (
            <div className="mt-4">
              <p className="text-green-700 text-sm font-semibold mb-2">
                ✅ Current Image
              </p>
              <img
                src={appwriteService.getFilePreview(post.featuredimage)} // Get image preview URL
                alt={post.title}
                className="rounded-xl border border-blue-400 w-full max-h-60 object-cover shadow-md"
              />
              <p className="text-xs text-gray-500 mt-1 break-words">
                {appwriteService.getFilePreview(post.featuredimage)}
              </p>
            </div>
          ) : (
            <p className="text-yellow-600 text-sm mt-2">
              📝 Upload image to preview
            </p>
          )}
        </div>

        <Select
          options={["active", "inactive"]} // Options for post status
          label="📌 Status"
          className="text-sm"
          {...register("status", { required: true })} // Register status select
        />

        <Button
          type="submit" // Submit button for form
          bgColor={post ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-gradient-to-r from-sky-500 to-blue-600"} // Button color changes based on post status
          className="w-full text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          {post ? "Update Post ✅" : "Submit Post 🚀"} // Button text changes based on action
        </Button>
      </div>
    </form>
  );
}
