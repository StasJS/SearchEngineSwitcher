import { useEffect, useState } from "react";
type MediaPreference = "light" | "dark";

function useMediaPreference(): MediaPreference | undefined {
	const [mediaPreference, setMediaPreference] = useState<MediaPreference | undefined>(undefined);

	useEffect(() => {
		const darkPreferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const lightPreferenceQuery = window.matchMedia("(prefers-color-scheme: light)");

		if (darkPreferenceQuery.matches) {
			setMediaPreference("dark");
		} else if (lightPreferenceQuery.matches) {
			setMediaPreference("light");
		}
		const handlerFactory = (mp: MediaPreference) => (event: MediaQueryListEvent) => {
			if (event.matches) {
				setMediaPreference(mp);
			}
		};
		const darkPreferenceHandler = handlerFactory("dark");
		const lightPreferenceHandler = handlerFactory("light");
		darkPreferenceQuery.addEventListener("change", darkPreferenceHandler);
		lightPreferenceQuery.addEventListener("change", lightPreferenceHandler);
		return () => {
			darkPreferenceQuery.removeEventListener("change", darkPreferenceHandler);
			lightPreferenceQuery.removeEventListener("change", lightPreferenceHandler);
		};
	}, []);

	return mediaPreference;
}

export default useMediaPreference;
