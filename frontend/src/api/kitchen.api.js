import { api } from "./axios"

export const updateStatus = async (id, status) => {
  await api.patch(`/orders/${id}/status`, { status })
}
