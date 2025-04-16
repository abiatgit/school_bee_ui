import React from "react";
import { useForm } from "react-hook-form";
import { Event } from "@prisma/client";

interface EventFormProps {
  type: "create" | "update";
  data?: Event;
}

const EventForm = ({ type, data }: EventFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (formData: never) => {
    try {
      const response = await fetch(`/api/events${type === "update" ? `/${data?.id}` : ""}`, {
        method: type === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="datetime-local"
          id="startDate"
          {...register("startDate")}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="endDate">End Date</label>
        <input
          type="datetime-local"
          id="endDate"
          {...register("endDate")}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="classId">Class ID</label>
        <input
          type="number"
          id="classId"
          {...register("classId")}
          className="border rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-abiYellow text-white py-2 px-4 rounded-md"
      >
        {type === "create" ? "Create" : "Update"} Event
      </button>
    </form>
  );
};

export default EventForm; 