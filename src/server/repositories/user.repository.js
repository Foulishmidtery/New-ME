import { selectHandlers } from "@/server/repositories/legacy-source";

export const userRepository = selectHandlers([
  "do_login", "do_logout", "api_login", "api_logout", "user_register", "users", "users_detail", "users_new",
  "users_whitelist", "insertusers", "updateusers", "deleteuser", "updatepassword", "changespassword", "approveusers",
  "approveipaddress", "ip_address_approve", "ip_address_reject", "users_ipaddress", "deleteipaddress",
]);
