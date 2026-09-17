import { db } from "@/lib/db";

export const usersRepository = {
  async listApproved() {
    return (await db.query("SELECT * FROM users WHERE approve = 'Y'")).rows;
  },
  async get(id) {
    return (await db.query("SELECT * FROM users WHERE id = $1", [id])).rows[0] ?? null;
  },
  async listNew() {
    return (await db.query("SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '1 month' AND approve = 'Y' ORDER BY created_at DESC")).rows;
  },
  async listRejectedIPs() {
    return (await db.query("SELECT * FROM users WHERE approve = 'N' ORDER BY created_at DESC")).rows;
  },
  async listApprovedIPs() {
    return (await db.query("SELECT * FROM users WHERE approve = 'Y' ORDER BY created_at DESC")).rows;
  },
  async listWhitelist() {
    return (await db.query("SELECT * FROM users WHERE approve = 'N' ORDER BY created_at DESC")).rows;
  },
  async listIPAddress() {
    return (await db.query("SELECT * FROM ip_address")).rows;
  },
  async approveUser(id, approverName, dateTime) {
    const result = await db.query(
      "UPDATE users SET approve=$1, approve_by=$2, approve_date=$3 WHERE id=$4 RETURNING *",
      ['Y', approverName, dateTime, id]
    );
    return result.rows[0];
  },
  async approveIPAddress(id, approverName, dateTime) {
    const result = await db.query(
      "UPDATE ip_address SET approve=$1, approve_by=$2, approve_date=$3 WHERE id=$4 RETURNING *",
      ['Y', approverName, dateTime, id]
    );
    return result.rows[0];
  },
  async deleteIPAddress(id) {
    return (await db.query("DELETE FROM ip_address WHERE id = $1 RETURNING id", [id])).rows[0] ?? null;
  },
  async deleteUser(id) {
    return (await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id])).rows[0] ?? null;
  },
  async listRoles() {
    return (await db.query("SELECT * FROM roles")).rows;
  },
  async createUser(data) {
    const result = await db.query(
      "INSERT INTO users(name, email, password, role_id, created_at, updated_at, approve, ip_address, directorat_id, id_province) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [data.name.replace(/\s/g, ''), data.email, data.password, data.role_id, data.time_datetime, data.time_datetime, 'Y', '0.0.0.0', data.directorat_id, data.id_province]
    );
    return result.rows[0];
  },
  async updateUserPassword(id, name, newPassword) {
    const result = await db.query(
      "UPDATE users SET name=$1, password=$2 WHERE id=$3 RETURNING *",
      [name, newPassword, id]
    );
    return result.rows[0];
  },
  async updateUser(id, data) {
    if (!data.passwords) {
      const result = await db.query(
        "UPDATE users SET name=$1, email=$2, role_id=$3, ip_address=$4, directorat_id=$5, id_province=$6 WHERE id=$7 RETURNING *",
        [data.names.replace(/\s/g, ''), data.emails, data.roles_id, '0.0.0.0', data.directorat_id, data.id_province, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE users SET name=$1, email=$2, password=$3, role_id=$4, ip_address=$5, directorat_id=$6, id_province=$7 WHERE id=$8 RETURNING *",
        [data.names.replace(/\s/g, ''), data.emails, data.passwords, data.roles_id, '0.0.0.0', data.directorat_id, data.id_province, id]
      );
      return result.rows[0];
    }
  }
};
