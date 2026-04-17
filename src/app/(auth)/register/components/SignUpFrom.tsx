"use client";

import { useState, useRef } from "react";
import styles from "./signup.module.css";
import { registerFormAction, sendOtpAction } from "../api/route";

/* ─── Types ─────────────────────────────────────────── */
interface FormData {
  name: string;
  userName: string;
  ffUserName: string;
  ffUid: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

type FieldKey = keyof FormData;

interface Errors {
  [key: string]: string;
}

/* ─── Validation rules (mirrors Zod schema) ─────────── */
const validate = (
  field: FieldKey,
  value: string,
  formData?: FormData,
): string => {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Name is required.";
      if (v.length < 3) return "Name must be at least 3 characters.";
      if (v.length > 50) return "Name must be under 50 characters.";
      return "";
    case "userName":
      if (!v) return "Username is required.";
      if (v.length < 3) return "Username must be at least 3 characters.";
      if (v.length > 50) return "Username must be under 50 characters.";
      return "";
    case "ffUserName":
      if (!v) return "Free Fire username is required.";
      return "";
    case "ffUid":
      if (!v) return "Free Fire UID is required.";
      if (isNaN(Number(v))) return "Free Fire UID must be a valid number.";
      return "";
    case "email":
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Enter a valid email address.";
      return "";
    case "otp":
      if (!v) return "OTP is required.";
      if (isNaN(Number(v))) return "Enter a valid OTP.";
      return "";
    case "password":
      if (!v) return "Password is required.";
      if (v.length < 4) return "Password must be at least 4 characters.";
      if (v.length > 50) return "Password must be under 50 characters.";
      return "";
    case "confirmPassword":
      if (!v) return "Please confirm your password.";
      if (v.length < 4) return "Password must be at least 4 characters.";
      if (formData && v !== formData.password.trim())
        return "Passwords do not match.";
      return "";
    default:
      return "";
  }
};

/* ─── Password strength ──────────────────────────────── */
type StrengthLevel = "none" | "weak" | "medium" | "strong";

const getStrength = (pw: string): StrengthLevel => {
  if (!pw) return "none";
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) || /[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (pw.length < 4) return "weak";
  if (score <= 1) return "weak";
  if (score === 2) return "medium";
  return "strong";
};

const strengthMeta: Record<StrengthLevel, { label: string; bars: number }> = {
  none: { label: "", bars: 0 },
  weak: { label: "Weak", bars: 1 },
  medium: { label: "Medium", bars: 2 },
  strong: { label: "Strong", bars: 3 },
};

/* ─── Step config ────────────────────────────────────── */
const STEPS = [
  { id: 0, label: "Profile", icon: "01" },
  { id: 1, label: "Verify", icon: "02" },
  { id: 2, label: "Security", icon: "03" },
];

/* ══════════════════════════════════════════════════════ */
export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    userName: "",
    ffUserName: "",
    ffUid: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Field helpers ── */
  const set = (field: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const touch = (field: FieldKey) => {
    const err = validate(field, formData[field], formData);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateFields = (fields: FieldKey[]): boolean => {
    const newErrors: Errors = {};
    let valid = true;
    for (const f of fields) {
      const err = validate(f, formData[f], formData);
      if (err) {
        newErrors[f] = err;
        valid = false;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return valid;
  };

  /* ── OTP ── */
  const sendOtp = async () => {
    if (!validateFields(["email"])) return;
    if (otpSent && otpTimer > 0) return;
    const response = await sendOtpAction(formData.email);
    console.log("OTP response:", response);
    // setOtpSent(true);
    // setOtpTimer(30);
    // if (timerRef.current) clearInterval(timerRef.current);
    // timerRef.current = setInterval(() => {
    //   setOtpTimer(t => {
    //     if (t <= 1) { clearInterval(timerRef.current!); return 0; }
    //     return t - 1;
    //   });
    // }, 1000);
  };

  /* ── Navigation ── */
  const stepFields: Record<number, FieldKey[]> = {
    0: ["name", "userName", "ffUserName", "ffUid"],
    1: ["email", "otp"],
    2: ["password", "confirmPassword"],
  };

  const next = async () => {
    if (!validateFields(stepFields[step])) return;
    if (step === 2) {
      setDone(true);
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }
      const res = await registerFormAction(data);
      console.log("Registration response:", res);
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  /* ── Strength ── */
  const strength = getStrength(formData.password);
  const { label: strengthLabel, bars: strengthBars } = strengthMeta[strength];

  /* ══ Render ══════════════════════════════════════════ */
  return (
    <div className={styles.page}>
      {/* Background grid lines */}
      <div className={styles.gridLines} aria-hidden="true" />

      <main className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandDot} />
          <span className={styles.brandName}>FireZone</span>
        </div>

        {!done ? (
          <>
            {/* Step indicator */}
            <nav className={styles.stepper} aria-label="Registration steps">
              {STEPS.map((s, i) => (
                <div key={s.id} className={styles.stepGroup}>
                  <div
                    className={[
                      styles.stepItem,
                      i < step ? styles.stepDone : "",
                      i === step ? styles.stepActive : "",
                    ].join(" ")}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <div className={styles.stepCircle}>
                      {i < step ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span>{s.icon}</span>
                      )}
                    </div>
                    <span className={styles.stepLabel}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={[
                        styles.stepLine,
                        i < step ? styles.stepLineDone : "",
                      ].join(" ")}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* ── Step 0 — Profile ── */}
            {step === 0 && (
              <section className={styles.panel}>
                <h1 className={styles.panelTitle}>Your profile</h1>
                <p className={styles.panelSub}>
                  Name, username, and Free Fire details
                </p>

                <Field label="Full name" error={errors.name}>
                  <input
                    className={errors.name ? styles.inputErr : ""}
                    type="text"
                    placeholder="e.g. Rohan Sharma"
                    value={formData.name}
                    maxLength={50}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => touch("name")}
                  />
                </Field>

                <div className={styles.twoCol}>
                  <Field label="Username" error={errors.userName}>
                    <input
                      className={errors.userName ? styles.inputErr : ""}
                      type="text"
                      placeholder="@handle"
                      value={formData.userName}
                      maxLength={50}
                      onChange={(e) => set("userName", e.target.value)}
                      onBlur={() => touch("userName")}
                    />
                  </Field>
                  <Field label="FF username" error={errors.ffUserName}>
                    <input
                      className={errors.ffUserName ? styles.inputErr : ""}
                      type="text"
                      placeholder="In-game name"
                      value={formData.ffUserName}
                      maxLength={50}
                      onChange={(e) => set("ffUserName", e.target.value)}
                      onBlur={() => touch("ffUserName")}
                    />
                  </Field>
                </div>

                <Field label="Free Fire UID" error={errors.ffUid}>
                  <input
                    className={errors.ffUid ? styles.inputErr : ""}
                    type="number"
                    placeholder="Numeric UID"
                    value={formData.ffUid}
                    onChange={(e) => set("ffUid", e.target.value)}
                    onBlur={() => touch("ffUid")}
                  />
                </Field>

                <div className={styles.actions}>
                  <button className={styles.btnPrimary} onClick={next}>
                    Continue <Arrow />
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 1 — Verify ── */}
            {step === 1 && (
              <section className={styles.panel}>
                <h1 className={styles.panelTitle}>Verify your email</h1>
                <p className={styles.panelSub}>
                  We'll send a one-time password to your inbox
                </p>

                <Field label="Email address" error={errors.email}>
                  <input
                    className={errors.email ? styles.inputErr : ""}
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => touch("email")}
                  />
                </Field>

                <div className={styles.otpRow}>
                  <Field label="OTP" error={errors.otp} style={{ flex: 1 }}>
                    <input
                      className={errors.otp ? styles.inputErr : ""}
                      type="number"
                      placeholder="6-digit code"
                      value={formData.otp}
                      onChange={(e) => set("otp", e.target.value)}
                      onBlur={() => touch("otp")}
                    />
                  </Field>
                  <div className={styles.otpBtnWrap}>
                    <button
                      className={styles.btnOtp}
                      onClick={sendOtp}
                      disabled={otpTimer > 0}
                    >
                      {otpSent
                        ? otpTimer > 0
                          ? `${otpTimer}s`
                          : "Resend"
                        : "Send OTP"}
                    </button>
                  </div>
                </div>

                {otpSent && otpTimer > 0 && (
                  <p className={styles.otpHint}>
                    OTP sent — resend in {otpTimer}s
                  </p>
                )}
                {otpSent && otpTimer === 0 && (
                  <p className={styles.otpHint}>
                    Didn't receive it? Click resend.
                  </p>
                )}

                <div className={styles.actions}>
                  <button className={styles.btnSecondary} onClick={back}>
                    Back
                  </button>
                  <button className={styles.btnPrimary} onClick={next}>
                    Continue <Arrow />
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 2 — Security ── */}
            {step === 2 && (
              <section className={styles.panel}>
                <h1 className={styles.panelTitle}>Secure your account</h1>
                <p className={styles.panelSub}>
                  Create a strong password to protect your account
                </p>

                <Field label="Password" error={errors.password}>
                  <input
                    className={errors.password ? styles.inputErr : ""}
                    type="password"
                    placeholder="Min 4 characters"
                    value={formData.password}
                    maxLength={50}
                    onChange={(e) => set("password", e.target.value)}
                    onBlur={() => touch("password")}
                  />
                  {formData.password && (
                    <div className={styles.strengthWrap}>
                      <div className={styles.strengthBars}>
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={[
                              styles.strengthBar,
                              i < strengthBars
                                ? styles[`strength_${strength}`]
                                : "",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                      {strengthLabel && (
                        <span
                          className={[
                            styles.strengthLabel,
                            styles[`strengthText_${strength}`],
                          ].join(" ")}
                        >
                          {strengthLabel}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                <Field label="Confirm password" error={errors.confirmPassword}>
                  <input
                    className={errors.confirmPassword ? styles.inputErr : ""}
                    type="password"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    maxLength={50}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    onBlur={() => touch("confirmPassword")}
                  />
                </Field>

                <div className={styles.actions}>
                  <button className={styles.btnSecondary} onClick={back}>
                    Back
                  </button>
                  <button className={styles.btnPrimary} onClick={next}>
                    Create account <Arrow />
                  </button>
                </div>
              </section>
            )}
          </>
        ) : (
          /* ── Success ── */
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M5 14l7 7 11-11"
                  stroke="#1D9E75"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className={styles.successTitle}>You're in.</h1>
            <p className={styles.successSub}>
              Account created successfully. Welcome to FireZone.
            </p>
            <div className={styles.successMeta}>
              <span className={styles.successChip}>
                {formData.userName || "Player"}
              </span>
              <span className={styles.successChip}>UID {formData.ffUid}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────── */
function Field({
  label,
  error,
  children,
  style,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={styles.field} style={style}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ marginLeft: 4 }}
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
