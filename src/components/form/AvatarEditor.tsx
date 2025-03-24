"use client";
import { useState, useEffect } from "react";
import { genConfig } from "react-nice-avatar";
import { AvatarConfig, Avatar as AvatarPreview } from "@/components/common";
import { Alert, Button } from "@/components/ui";
import { useAuth, useAvatar } from "@/hooks";

const skinToneColors = ["#ffe0bd", "#ffd0a6", "#c68642", "#8d5524", "#613318"];

const controls = [
  {
    label: "Yüz Rengi",
    key: "faceColor",
    type: "cycle",
    options: skinToneColors,
  },
  {
    label: "Kulak Boyutu",
    key: "earSize",
    type: "cycle",
    options: ["small", "big"],
  },
  {
    label: "Saç Stili",
    key: "hairStyle",
    type: "cycle",
    options: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
  },
  { label: "Saç Rengi", key: "hairColor", type: "colorPicker" },
  {
    label: "Şapka Stili",
    key: "hatStyle",
    type: "cycle",
    options: ["none", "beanie", "turban"],
  },
  { label: "Şapka Rengi", key: "hatColor", type: "colorPicker" },
  {
    label: "Göz Stili",
    key: "eyeStyle",
    type: "cycle",
    options: ["circle", "oval", "smile"],
  },
  {
    label: "Gözlük Stili",
    key: "glassesStyle",
    type: "cycle",
    options: ["none", "round", "square"],
  },
  {
    label: "Burun Stili",
    key: "noseStyle",
    type: "cycle",
    options: ["short", "long", "round"],
  },
  {
    label: "Ağız Stili",
    key: "mouthStyle",
    type: "cycle",
    options: ["laugh", "smile", "peace"],
  },
  {
    label: "Gömlek Stili",
    key: "shirtStyle",
    type: "cycle",
    options: ["hoody", "short", "polo"],
  },
  { label: "Gömlek Rengi", key: "shirtColor", type: "colorPicker" },
  { label: "Arka Plan Rengi", key: "bgColor", type: "colorPicker" },
];

export default function AvatarEditor() {
  const { username } = useAuth();
  const { getUserAvatar, updateUserAvatar, avatarUpdateLoading } = useAvatar();
  const [config, setConfig] = useState<AvatarConfig>(genConfig());

  // Alert state management
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    show: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    if (username) {
      loadUserAvatar();
    }
  }, [username]);

  const loadUserAvatar = async (): Promise<void> => {
    if (!username) return;

    try {
      const response = await getUserAvatar(username);
      if (response.data) {
        setConfig(response.data);
      }
    } catch (error) {
      console.error("Failed to load avatar:", error);
    }
  };

  const saveAvatar = async () => {
    if (!username) {
      setAlertInfo({
        show: true,
        message: "Avatarı kaydetmek için giriş yapmalısınız",
        type: "error",
      });
      return;
    }

    try {
      const response = await updateUserAvatar(username, config);
      if (response.data) {
        setAlertInfo({
          show: true,
          message: "Avatar başarıyla kaydedildi",
          type: "success",
        });
      } else if (response.error) {
        setAlertInfo({
          show: true,
          message: response.error.message || "Avatar kaydedilemedi",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Avatar kaydedilemedi:", error);
      setAlertInfo({
        show: true,
        message: "Avatar kaydedilemedi",
        type: "error",
      });
    }
  };

  const cycleOption = (key: string, options: string[]) => {
    const currentValue = config[key as keyof AvatarConfig];
    const currentIndex = options.indexOf(currentValue as string);
    const nextIndex = (currentIndex + 1) % options.length;
    setConfig({ ...config, [key]: options[nextIndex] });
  };

  const randomize = () => setConfig(genConfig());

  return (
    <div className="flex min-h-screen flex-col items-center text-sm">
      <div className="mb-6 h-32 w-32">
        <AvatarPreview config={config} />
      </div>
      <div className="mb-6 grid w-full max-w-2xl grid-cols-2 gap-2">
        {controls.map((control) => (
          <div key={control.key} className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-300">
              {control.label}:
            </span>
            {control.type === "cycle" ? (
              <button
                className="rounded bg-neutral-200 px-3 py-1 text-neutral-800 transition hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                onClick={() => cycleOption(control.key, control.options || [])}
              >
                {control.key.includes("Color") ? (
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{
                      backgroundColor: config[
                        control.key as keyof AvatarConfig
                      ] as string,
                    }}
                  />
                ) : (
                  config[control.key as keyof AvatarConfig]
                )}
              </button>
            ) : (
              <button className="rounded bg-neutral-200 px-3 py-1 text-neutral-800 transition hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600">
                <input
                  type="color"
                  value={config[control.key as keyof AvatarConfig] as string}
                  onChange={(e) =>
                    setConfig({ ...config, [control.key]: e.target.value })
                  }
                  className="absolute h-6 w-6 opacity-0"
                />
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: config[
                      control.key as keyof AvatarConfig
                    ] as string,
                  }}
                />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mb-6 flex gap-4">
        <Button onClick={randomize}>Rastgele</Button>
        <Button onClick={saveAvatar} disabled={avatarUpdateLoading}>
          Kaydet
        </Button>
      </div>

      {/* Alert component for notifications */}
      {alertInfo.show && (
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          show={alertInfo.show}
          onClose={() => setAlertInfo({ ...alertInfo, show: false })}
          autoClose={true}
          autoCloseTime={5000}
        />
      )}

      {/* <div className="w-full max-w-2xl">
        <pre className="overflow-auto rounded bg-neutral-100 p-4 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}
