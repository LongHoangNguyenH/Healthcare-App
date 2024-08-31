"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { count } from "console";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialColumns = {
      scheduledCount: 0,
      pendingCount: 0,
      CancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") acc.scheduledCount += 1;
        if (appointment.status === "pending") acc.pendingCount += 1;
        if (appointment.status === "cancelled") acc.CancelledCount += 1;

        return acc;
      },
      initialColumns
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,  
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};
