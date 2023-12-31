import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { isEditing, updateSettings } = useUpdateSettings();

  const {
    min_booking_length: minBookingLength,
    max_booking_length: maxBookingLength,
    max_guests_per_booking: maxGuestsPerBooking,
    breakfast_price: breakfastPrice,
  } = settings;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSettings({
      [field]: value,
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
