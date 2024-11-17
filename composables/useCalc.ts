export default function (key: string, size: number) {
  const result = useState<number>(key, () => 0);

  const handleUpdateSize = (screen_width?: number, base_size?: number) => {
    if (!screen_width || !base_size) return;

    result.value = size * (screen_width / base_size);
  };

  onMounted(() => {
    const root = getComputedStyle(document.body);
    const base_size = root.getPropertyValue("--base-viewport-width");

    handleUpdateSize(window.innerWidth, parseInt(base_size));

    window.addEventListener("resize", () => {
      handleUpdateSize(window.innerWidth, parseInt(base_size));
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", () => handleUpdateSize());
  });

  return { result };
}
