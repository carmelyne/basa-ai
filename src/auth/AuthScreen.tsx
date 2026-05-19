import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Check, ShieldCheck, Mail, Phone, Lock } from "lucide-react-native";

import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, spacing, typography } from "../ui/theme";
import { LocalProgress, backupProgressToCloud, restoreProgressFromCloud } from "../progress/progress-storage";

type AuthScreenProps = {
  mode: "backup" | "restore";
  currentProgress: LocalProgress;
  onBack: () => void;
  onSuccess: (progress?: LocalProgress) => void;
};

export function AuthScreen({
  mode,
  currentProgress,
  onBack,
  onSuccess,
}: AuthScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [error, setError] = useState<string | null>(null);

  const isEmail = identifier.includes("@");
  const isPhone = /^\d+$/.test(identifier.replace(/[\s+-]/g, "")) && identifier.length >= 7;
  const isValidIdentifier = identifier.trim().length > 0 && (isEmail || isPhone);

  const handleSendCode = async () => {
    if (!isValidIdentifier) {
      setError("Mangyaring maglagay ng tamang email o phone number.");
      return;
    }
    setError(null);
    setStep("otp");
  };

  const handleVerifyCode = async () => {
    if (otp !== "1234") {
      setError("Maling code. Subukan muli gamit ang code na 1234.");
      return;
    }

    setError(null);

    if (mode === "backup") {
      try {
        await backupProgressToCloud(identifier, currentProgress);
        setStep("success");
      } catch (err) {
        setError("Nagkaroon ng problema sa pag-save. Subukan muli.");
      }
    } else {
      try {
        const restored = await restoreProgressFromCloud(identifier);
        if (restored) {
          setStep("success");
          // Hold the restored progress to pass back on success completion
          setRestoredProgress(restored);
        } else {
          setError("Walang nakitang progreso para sa account na ito.");
        }
      } catch (err) {
        setError("Nagkaroon ng problema sa pag-restore. Subukan muli.");
      }
    }
  };

  const [restoredProgress, setRestoredProgress] = useState<LocalProgress | undefined>(undefined);

  const handleFinish = () => {
    onSuccess(restoredProgress);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.cream }}
    >
      <ScreenScrollView>
        <LessonNavBar
          label={mode === "backup" ? "I-save ang Progreso" : "Ibalik ang Progreso"}
          onBack={onBack}
          onHome={onBack}
        />

        <View style={styles.contentWrapper}>
          {step === "input" && (
            <>
              <View style={styles.header}>
                <Text style={styles.kicker}>
                  {mode === "backup" ? "Seguridad" : "Ibalik"}
                </Text>
                <Text style={styles.title}>
                  {mode === "backup" ? "I-save ang iyong progreso" : "Ibalik ang iyong progreso"}
                </Text>
                <Text style={styles.subtitle}>
                  {mode === "backup"
                    ? "I-link ang iyong progreso sa iyong phone o email para hindi ito mawala kahit magpalit ka ng device."
                    : "Ipasok ang iyong phone number o email na ginamit mo noon para maibalik ang lahat ng iyong nakuhang mga badge."}
                </Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.label}>Phone number o Email address</Text>
                <View style={styles.inputContainer}>
                  {identifier.includes("@") ? (
                    <Mail color={colors.forestSoft} size={20} style={styles.inputIcon} />
                  ) : (
                    <Phone color={colors.forestSoft} size={20} style={styles.inputIcon} />
                  )}
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    keyboardType={identifier.includes("@") ? "email-address" : "phone-pad"}
                    onChangeText={(val) => {
                      setIdentifier(val);
                      setError(null);
                    }}
                    placeholder="Hal. 09171234567 o pangalan@email.com"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={identifier}
                  />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <AppButton
                  disabled={!isValidIdentifier}
                  label="Ipadala ang code"
                  onPress={handleSendCode}
                  style={styles.submitButton}
                />
              </View>

              <View style={styles.noteCard}>
                <ShieldCheck color={colors.forestSoft} size={18} strokeWidth={2.3} />
                <View style={styles.noteContent}>
                  <Text style={styles.noteTitle}>Ganap na pribado at ligtas</Text>
                  <Text style={styles.noteText}>
                    Hindi kami nagpapakita ng public profile. Ginagamit lamang ang phone o email para i-verify ang iyong sariling device.
                  </Text>
                </View>
              </View>
            </>
          )}

          {step === "otp" && (
            <>
              <View style={styles.header}>
                <Text style={styles.kicker}>Verification</Text>
                <Text style={styles.title}>Ipasok ang code</Text>
                <Text style={styles.subtitle}>
                  Nagpadala kami ng 4-digit code sa {identifier}. Ipasok ito sa ibaba.
                </Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.label}>Code</Text>
                <View style={styles.inputContainer}>
                  <Lock color={colors.forestSoft} size={20} style={styles.inputIcon} />
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={(val) => {
                      setOtp(val);
                      setError(null);
                    }}
                    placeholder="Maglagay ng 4-digit code"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={otp}
                  />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.testHint}>
                  💡 Pahiwatig para sa pagsusuri: I-type ang code na <Text style={{ fontWeight: "700" }}>1234</Text>
                </Text>

                <AppButton
                  disabled={otp.length !== 4}
                  label="I-verify at Magpatuloy"
                  onPress={handleVerifyCode}
                  style={styles.submitButton}
                />

                <Pressable onPress={() => setStep("input")} style={styles.changeContactBtn}>
                  <Text style={styles.changeContactTxt}>Baguhin ang phone number o email</Text>
                </Pressable>
              </View>
            </>
          )}

          {step === "success" && (
            <View style={styles.successContainer}>
              <View style={styles.successBadge}>
                <Check color={colors.surface} size={48} strokeWidth={3} />
              </View>
              <Text style={styles.successTitle}>
                {mode === "backup" ? "Nai-save ang progreso!" : "Nabalik ang progreso!"}
              </Text>
              <Text style={styles.successSubtitle}>
                {mode === "backup"
                  ? "Konektado na ang iyong progreso sa " + identifier + ". Maaari mo na itong ma-access sa ibang phone."
                  : "Matagumpay na naibalik ang iyong mga natapos na salita at mga nakuha nang badge!"}
              </Text>

              <AppButton
                label="Ipagpatuloy"
                onPress={handleFinish}
                style={styles.successDoneButton}
              />
            </View>
          )}
        </View>
      </ScreenScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    alignItems: "flex-start",
  },
  kicker: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: colors.forest,
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
  formCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: spacing.md,
  },
  label: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.forest,
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: "600",
    height: "100%",
  },
  errorText: {
    color: colors.blue,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: spacing.xs,
  },
  noteCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: "flex-start",
  },
  noteContent: {
    flex: 1,
    gap: spacing.xs,
  },
  noteTitle: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  noteText: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    lineHeight: typography.general.lineHeight,
  },
  testHint: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontStyle: "italic",
    textAlign: "center",
  },
  changeContactBtn: {
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  changeContactTxt: {
    color: colors.blue,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xxl,
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  successBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.forestAction,
    borderRadius: radii.full,
    width: 96,
    height: 96,
  },
  successTitle: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    textAlign: "center",
  },
  successSubtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    textAlign: "center",
  },
  successDoneButton: {
    width: "100%",
    marginTop: spacing.sm,
  },
});
