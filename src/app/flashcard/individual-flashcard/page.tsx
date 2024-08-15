import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import RenderedFlashcardGrid from "../../components/FlashCardPages/RenderedFlashcardGrid";
import { FlippedState } from "@/types/flashcardFlipState";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
import TypographyHeader from "../../components/TypographyHeader";