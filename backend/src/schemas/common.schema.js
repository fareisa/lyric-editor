export const idParamSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
        type: "string",
        minLength: 1
    }
  }
};