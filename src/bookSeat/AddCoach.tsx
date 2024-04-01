import { useForm } from "react-hook-form";
import { Button, Input, Label } from "keep-react";
import { TCoach } from "../utils/types/types";
import { usePostDataMutation } from "../redux/api/apiSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddCoach = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigate();
  const [postData, { isLoading }] = usePostDataMutation();
  const [departure, setDeparture] = useState(new Date());

  const onSubmit = async (data: Partial<TCoach>) => {
    console.log(data);
    const response = await postData({ ...data, departure: departure });

    if ("error" in response) {
      // Handle error case
      console.error("An error occurred:", response.error);
      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while submitting the form. Please try again later.",
      });
    } else {
      // Handle success case
      console.log("Data successfully submitted:", response.data);
      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your data has been successfully submitted.",
      }).then(() => {
        // Redirect to '/'
        navigation(`/booking/${response.data._id}`);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md my-10 capitalize"
    >
      <fieldset className="max-w-md space-y-1">
        <Label htmlFor="name">Enter Name</Label>
        <Input
          {...register("name", { required: true })}
          id="name"
          placeholder="Enter name"
          type="text"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </fieldset>
      <fieldset className="max-w-md space-y-1">
        <Label htmlFor="image">Image Link</Label>
        <Input
          {...register("image", { required: true })}
          id="image"
          placeholder="Enter image Link"
          type="text"
        />
        {errors.image && (
          <span className="text-red-500">Image link is required</span>
        )}
      </fieldset>
      <fieldset className="max-w-md space-y-1">
        <Label htmlFor="number">Coach Number</Label>
        <Input
          {...register("number", { required: true })}
          id="number"
          placeholder="Enter Coach Number"
          type="text"
        />
        {errors.number && (
          <span className="text-red-500">Coach number is required</span>
        )}
      </fieldset>
      <fieldset className="max-w-md space-y-1">
        <div className="CouponInputGroup1">
          <label>Start Date</label>
          <DatePicker
            selected={departure}
            showTimeSelect
            dateFormat="Pp"
            onChange={(date: Date) => setDeparture(date)}
            required
          />
        </div>
        {errors.departure && (
          <span className="text-red-500">Departure time is required</span>
        )}
      </fieldset>
      <fieldset className="max-w-md space-y-1">
        <Label htmlFor="seats">Seats</Label>
        <Input
          {...register("seats", { required: true })}
          id="seats"
          placeholder="Enter Seats"
          type="text"
        />
        {errors.seats && (
          <span className="text-red-500">Seats are required</span>
        )}
      </fieldset>
      <fieldset className="max-w-md space-y-1">
        <Label htmlFor="price">Price</Label>
        <Input
          {...register("price", { required: true })}
          id="price"
          placeholder="Enter price"
          type="text"
        />
        {errors.price && (
          <span className="text-red-500">Price is required</span>
        )}
      </fieldset>
      <Button type="submit" size="sm" color="primary">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
