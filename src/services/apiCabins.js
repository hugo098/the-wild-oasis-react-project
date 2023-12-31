import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://gdshxmhfjtosocwadovm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins");

  if (!id)
    query = query.insert([
      {
        name: newCabin?.name,
        max_capacity: newCabin?.maxCapacity,
        regular_price: newCabin?.regularPrice,
        discount: newCabin?.discount,
        image: imagePath,
        description: newCabin?.description,
      },
    ]);

  if (id)
    query = query
      .update({
        name: newCabin?.name,
        max_capacity: newCabin?.maxCapacity,
        regular_price: newCabin?.regularPrice,
        discount: newCabin?.discount,
        image: imagePath,
        description: newCabin?.description,
      })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error("Error while uploading cabin image");
  }

  return data;
}
