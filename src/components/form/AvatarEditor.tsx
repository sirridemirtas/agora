"use client";
import { useState, useEffect } from "react";
import { genConfig } from "react-nice-avatar";
import { Save as SaveIcon, Shuffle as ShuffleIcon } from "lucide-react";
import { AvatarConfig, Avatar as AvatarPreview } from "@/components/common";
import { Alert, Button } from "@/components/ui";
import { useAuth, useAvatar } from "@/hooks";

const skinToneColors = [
  "#ffe0bd", // Light beige
  "#ffd0a6", // Light peach
  "#f0c27b", // Medium-light tan
  "#c68642", // Medium brown
  "#a0522d", // Medium-dark brown
  "#8d5524", // Dark brown
  "#613318", // Very dark brown
];
const hairColors = [
  "#000000", // Black
  "#4d2900", // Dark brown
  "#a56c43", // Medium brown
  "#d6b370", // Light brown
  "#f0e68c", // Light blondes
  "#e5e5e5", // Gray
  "#b01030", // Bright red
  "#8b0000", // Dark reds
  "#6a4e35", // Medium-dark brown
  "#cb6820", // Auburn
  "#9e3300", // Reddish-brown
  "#0000ff", // Blue
  "#800080", // Purple
  "#008000", // Green
];
const hatColors = [
  "#ff5e5e", // Red
  "#5eabff", // Light blue
  "#53d86a", // Green
  "#ff5e8a", // Pink
  "#dab83f", // Mustard yellow
  "#7066ff", // Purple
  "#4f5154", // Gray
  "#ffffff", // White
  "#e7b80e", // Golden yellow
  "#ffa500", // Oranges
  "#a52a2a", // Browns
  "#000000", // Blacks
  "#90ee90", // Light greens
  "#00ffff", // Cyans
];
const shirtColors = [
  "#f44336", // Red
  "#e91e63", // Pink
  "#9c27b0", // Purple
  "#673ab7", // Deep purple
  "#3f51b5", // Indigo
  "#2196f3", // Blue
  "#03a9f4", // Light blue
  "#00bcd4", // Cyan
  "#009688", // Teal
  "#4caf50", // Green
  "#8bc34a", // Light green
  "#cddc39", // Lime
  "#ffffff", // White
  "#000000", // Black
  "#00008b", // Dark blues
  "#ff69b4", // Bright pinks
  "#808000", // Olives
  "#800000", // Maroons
];
const bgColors = [
  "#92a1c6", // Light blue-gray
  "#dac292", // Light brown
  "#2b328c", // Dark blue
  "#9fc2cc", // Pale cyan
  "#2a8fbd", // Medium blue
  "#6f8484", // Gray-green
  "#e6aec7", // Light pink
  "#5cc750", // Bright green
  "#befdd5", // Pale green
  "#85bae3", // Sky blue
  "#eeb8ff", // Light purple
  "#fdfd8c", // Pale yellow
  "#000000", // Blacks
  "#ffffff", // Whites
  "#ff0000", // Reds
  "#ffff00", // Yellows
  "#800080", // Purples
];

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
  {
    label: "Saç Rengi",
    key: "hairColor",
    type: "cycle",
    options: hairColors,
  },
  {
    label: "Şapka Stili",
    key: "hatStyle",
    type: "cycle",
    options: ["none", "beanie", "turban"],
  },
  {
    label: "Şapka Rengi",
    key: "hatColor",
    type: "cycle",
    options: hatColors,
  },
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
  {
    label: "Gömlek Rengi",
    key: "shirtColor",
    type: "cycle",
    options: shirtColors,
  },
  {
    label: "Arka Plan Rengi",
    key: "bgColor",
    type: "cycle",
    options: bgColors,
  },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="mb-6 grid w-full max-w-md grid-cols-2 gap-2">
        {controls.map((control) => {
          const isColorControl = control.key.includes("Color");
          const currentValue = config[control.key as keyof AvatarConfig];

          return (
            <div
              key={control.key}
              className="flex items-center justify-between"
            >
              <button
                className="flex w-full items-center justify-between rounded bg-neutral-100 px-3 py-2 text-neutral-800 transition hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                onClick={() => cycleOption(control.key, control.options || [])}
                title={currentValue as string}
                aria-label={`${control.label}: ${currentValue}`}
              >
                <span>{control.label}</span>
                {isColorControl && (
                  <div
                    className="h-5 w-5 rounded border border-neutral-400"
                    style={{ backgroundColor: currentValue as string }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mb-6 flex gap-4">
        <Button onClick={randomize} variant="secondary" icon={ShuffleIcon}>
          Rastgele
        </Button>
        <Button
          onClick={saveAvatar}
          disabled={avatarUpdateLoading}
          icon={SaveIcon}
        >
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
          className="w-full max-w-md"
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
