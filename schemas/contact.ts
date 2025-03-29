import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({
      name: "dateRecived",
      title: "Date",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
  ],
});
