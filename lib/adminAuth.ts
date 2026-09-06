import "dotenv/config";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return secret;
}

function createSignature(value: string) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = `admin:${expiresAt}`;
  const signature = createSignature(payload);

  return `${payload}.${signature}`;
}

export function verifyAdminSession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const parts = value.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [payload, signature] = parts;

  const [user, expiresAtString] = payload.split(":");

  if (user !== "admin") {
    return false;
  }

  const expiresAt = Number(expiresAtString);

  if (!Number.isInteger(expiresAt)) {
    return false;
  }

  if (expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedSignature = createSignature(payload);

  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export { COOKIE_NAME, SESSION_DURATION };