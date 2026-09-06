"use client";

import { FormEvent, useState } from "react";

type StudioSettingsFormProps = {
  settings: {
    address: string | null;
    phone: string | null;
    email: string | null;
    instagram: string | null;
    whatsapp: string | null;
    openingHours: string | null;
  };
};

export default function StudioSettingsForm({
  settings,
}: StudioSettingsFormProps) {
  const [address, setAddress] = useState(settings.address ?? "");
  const [phone, setPhone] = useState(settings.phone ?? "");
  const [email, setEmail] = useState(settings.email ?? "");
  const [instagram, setInstagram] = useState(
    settings.instagram ?? ""
  );
  const [whatsapp, setWhatsapp] = useState(
    settings.whatsapp ?? ""
  );
  const [openingHours, setOpeningHours] = useState(
    settings.openingHours ?? ""
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          phone,
          email,
          instagram,
          whatsapp,
          openingHours,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update settings."
        );
      }

      setMessage("Studio settings updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update settings."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label
            htmlFor="settings-address"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Address
          </label>

          <input
            id="settings-address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="Studio address"
          />
        </div>

        <div>
          <label
            htmlFor="settings-phone"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Phone
          </label>

          <input
            id="settings-phone"
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="+91 ..."
          />
        </div>

        <div>
          <label
            htmlFor="settings-email"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Email
          </label>

          <input
            id="settings-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="hello@studio.com"
          />
        </div>

        <div>
          <label
            htmlFor="settings-instagram"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Instagram
          </label>

          <input
            id="settings-instagram"
            type="url"
            value={instagram}
            onChange={(event) =>
              setInstagram(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label
            htmlFor="settings-whatsapp"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            WhatsApp
          </label>

          <input
            id="settings-whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(event) =>
              setWhatsapp(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="+91 ..."
          />
        </div>

        <div>
          <label
            htmlFor="settings-hours"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Opening Hours
          </label>

          <input
            id="settings-hours"
            value={openingHours}
            onChange={(event) =>
              setOpeningHours(event.target.value)
            }
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            placeholder="Monday - Saturday: 10:00 AM - 8:00 PM"
          />
        </div>
      </div>

      {message && (
        <p className="text-sm text-(--muted)">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-fit border border-(--accent) px-6 py-4 text-xs uppercase tracking-[0.2em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings →"}
      </button>
    </form>
  );
}
