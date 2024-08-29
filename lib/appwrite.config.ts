import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66cf36de001d3c915c68').setKey('fe51d52dd14beee25389c2a864a205d5562b05b7ae0082a5aba0e08819ef827aeaedb3900ffa40d75b31c7005aab7f75ced7878586d1103d259488a6fb736dbf0fa3f4a46ca0ce4dd7585d239cc9001281b9f025dfb63034728c3472d2cf174ee10b2105eb5c68fd2a8bc83d1b65e22a1d205594431115fffbb3e194fe9e6269');

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
