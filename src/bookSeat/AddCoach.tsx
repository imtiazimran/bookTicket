import { useForm } from "react-hook-form";
import { Button, Input, Label } from "keep-react";
import { TCoach } from "../utils/types/types";
import { usePostDataMutation } from "../redux/api/apiSlice";
import TimePicker from "react-time-picker";

export const AddCoach = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, // Add watch function
        setValue // Add setValue function
      } = useForm();

  const [postData, { isLoading }] = usePostDataMutation()

  const onSubmit = async (data: Partial<TCoach>) => {
    console.log(data);
    const response = await postData({...data, "departure": new Date()});
    console.log(response, isLoading);
    // Call your API or perform any other action with the form data
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
        <Label htmlFor="departure">Departure Time</Label>
        <TimePicker
          id="departure"
          name="departure"
          value={watch('departure') || ''}
          onChange={(value) => setValue('departure', value)}
          format="HH:mm"
          required
        />
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
        Submit
      </Button>
    </form>
  );
};
