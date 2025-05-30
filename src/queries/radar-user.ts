import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application.ts";
import { CREATE_RADAR_USER, GET_RADAR_USERS } from "@/constants/query-keys.ts";

import { userSchema } from "@/schemas/user.tsx";

export const query1 = {
  mutationFn: async (values: z.infer<typeof userSchema>) => {
    const response = await fetch(`${API_URL}/radar_users`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    return await response.json();
  },
  mutationKey: [CREATE_RADAR_USER],
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: [GET_RADAR_USERS] });
    toast.success("Radar user has been created successfully");
  },
  onError(error) {
    toast.error("Error creating radar user", {
      description: error.message,
    });
  },
};
