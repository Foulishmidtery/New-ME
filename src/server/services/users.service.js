import { usersRepository } from "@/server/repositories/users.repository";
import bcrypt from "bcrypt";

function getCurrentDateTime() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = `${today.getFullYear()}-${month}-${String(today.getDate()).padStart(2, "0")}`;
  const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}:${String(today.getSeconds()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

export const usersService = {
  listApproved: () => usersRepository.listApproved(),
  get: (id) => usersRepository.get(id),
  listNew: () => usersRepository.listNew(),
  listRejectedIPs: () => usersRepository.listRejectedIPs(),
  listApprovedIPs: () => usersRepository.listApprovedIPs(),
  listWhitelist: () => usersRepository.listWhitelist(),
  listIPAddress: () => usersRepository.listIPAddress(),
  approveUser: (id, approverName) => usersRepository.approveUser(id, approverName, getCurrentDateTime()),
  approveIPAddress: (id, approverName) => usersRepository.approveIPAddress(id, approverName, getCurrentDateTime()),
  deleteIPAddress: (id) => usersRepository.deleteIPAddress(id),
  deleteUser: (id) => usersRepository.deleteUser(id),
  listRoles: () => usersRepository.listRoles(),
  
  createUser: async (data) => {
    data.time_datetime = getCurrentDateTime();
    const salts = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salts);
    return usersRepository.createUser(data);
  },
  
  changePassword: async (userId, oldPassword, newPassword, verifyPassword, names) => {
    const user = await usersRepository.get(userId);
    if (!user) return { success: false, message: 'User not found' };
    
    const match = await bcrypt.compare(oldPassword, user.password);
    if (match) {
      if (newPassword === verifyPassword) {
        const salts = await bcrypt.genSalt(10);
        const pw = await bcrypt.hash(newPassword, salts);
        await usersRepository.updateUserPassword(userId, names, pw);
        return { success: true };
      } else {
        return { success: false, message: 'new password and password confirm not match !' };
      }
    } else {
      return { success: false, message: 'password not match in database!' };
    }
  },
  
  updateUser: async (id, data) => {
    if (data.passwords) {
      const salts = await bcrypt.genSalt(10);
      data.passwords = await bcrypt.hash(data.passwords, salts);
    }
    return usersRepository.updateUser(id, data);
  }
};
