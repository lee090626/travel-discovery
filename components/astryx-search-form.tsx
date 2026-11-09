"use client";

import { Button } from "@astryxdesign/core/Button";
import { TextInput } from "@astryxdesign/core/TextInput";
import { useState } from "react";
import { Icon } from "@/components/icons";
import styles from "./astryx-search-form.module.css";

export function SearchForm({
  initialValue = "",
  variant = "default",
  placeholder = "지역이나 여행지를 검색해 보세요",
  submitLabel = "검색",
}: {
  initialValue?: string;
  variant?: "default" | "hero";
  placeholder?: string;
  submitLabel?: string;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <form className={`${styles.form} ${variant === "hero" ? styles.hero : styles.compact}`} action="/search" role="search">
      <TextInput
        containerClassName={styles.input}
        controlClassName={styles.control}
        type="search"
        label="지역, 여행지, 키워드 검색"
        isLabelHidden
        value={value}
        onChange={(nextValue) => setValue(nextValue.slice(0, 80))}
        htmlName="q"
        placeholder={placeholder}
        startIcon={<Icon name="search" size={18} />}
        size="lg"
        autoComplete="off"
        enterKeyHint="search"
      />
      <Button
        className={styles.button}
        label={submitLabel}
        type="submit"
        variant="primary"
        size="lg"
      />
    </form>
  );
}
