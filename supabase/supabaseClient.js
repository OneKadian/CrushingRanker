import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

// Fetch all records from the "records" table
export const getRecords = async () => {
  const { data: records, error } = await supabase
    .from("records") // Use the correct table name: "records"
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching records:", error);
    return []; // Or handle the error differently
  }
  return records;
};

// Insert a new record into the "records" table
// Insert a new record into the "records" table, including mailScore and dmScore
export const insertRecord = async (
  companyLink,
  emailAddress,
  applied,
  mailed,
  DMed,
  user_id,
  name,
  score,
  mailScore, // New parameter for mail count
  dmScore // New parameter for DM count
) => {
  try {
    const { data, error } = await supabase.from("records").insert({
      companyLink, // Maps to the "companyLink" column
      emailAddress, // Maps to the "emailAddress" column in form data emailAddress
      applied, // Maps to the "applied" checkbox state
      mailed, // Maps to the "mailed" checkbox state
      DMed, // Maps to the "DMed" checkbox state
      user_id, // User ID fetched from Clerk
      name, // Name of the person
      score, // The overall score (if used)
      mailScore, // New: Maps to the "mailScore" column
      dmScore, // New: Maps to the "dmScore" column
    });

    if (error) {
      console.error("Error inserting record:", error);
      return { data: null, error };
    }

    console.log("Record inserted successfully:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error };
  }
};

// Update an existing record in the "records" table, including mailScore and dmScore
export const updateRecord = async (
  companyLink,
  emailAddress,
  applied,
  mailed,
  DMed,
  id,
  mailScore, // New parameter for mail count update
  dmScore // New parameter for DM count update
) => {
  try {
    const { data, error } = await supabase
      .from("records")
      .update({
        companyLink, // Update the "companyLink" column
        emailAddress, // Update the "emailAddress" column
        applied, // Update the "applied" checkbox state
        mailed, // Update the "mailed" checkbox state
        DMed, // Update the "DMed" checkbox state
        mailScore, // New: Update the "mailScore" column
        dmScore, // New: Update the "dmScore" column
      })
      .eq("id", id); // Use the provided ID to select the correct record

    if (error) {
      console.error("Error updating record:", error);
      return { data: null, error };
    }

    console.log("Record updated successfully:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error };
  }
};

// Fetch user records and return the latest score
export const getRecords2 = async (user_id) => {
  const { data: records, error } = await supabase
    .from("records") // Use the correct table name
    .select("*")
    .eq("user_id", user_id); // Filter by user ID

  if (error) {
    console.error("Error fetching records:", error);
    return [];
  }

  return records;
};

export const getUserIDS = async () => {
  const { data: IDs, error } = await supabase
    .from("userIDS") // Use the correct table name: "records"
    .select("*");

  if (error) {
    console.error("Error fetching user ID:", error);
    return []; // Or handle the error differently
  }
  return IDs;
};

export const insertUserID = async (user_id) => {
  try {
    const { data, error } = await supabase.from("userIDS").insert({
      user_id, // User ID fetched from Clerk
    });

    if (error) {
      console.error("Error inserting user ID:", error);
      return { data: null, error };
    }

    console.log("userID inserted successfully:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error };
  }
};
