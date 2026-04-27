"use client"

import { FileText, BookOpen, Package, Droplets } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { ProductContent, ProductDescriptionBlock } from "@/data/product-content"

interface ProductAccordionProps {
  content: ProductContent
}

function DescriptionBlock({ block }: { block: ProductDescriptionBlock }) {
  const paragraphs = block.body?.split("\n\n").filter(Boolean) ?? []

  return (
    <div className="mb-4 last:mb-0">
      {block.heading && (
        <p className="font-heading text-sm font-semibold text-foreground mb-2 leading-snug">
          {block.heading}
        </p>
      )}
      {paragraphs.map((para) => (
        <p
          key={para.slice(0, 48)}
          className="font-sans text-sm text-muted-foreground leading-relaxed mb-1.5 last:mb-0"
        >
          {para}
        </p>
      ))}
      {block.bullets && block.bullets.length > 0 && (
        <ul className="mt-2 space-y-1.5 pl-1">
          {block.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 48)}
              className="flex items-start gap-2 font-sans text-sm text-muted-foreground leading-relaxed"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ProductAccordion({ content }: ProductAccordionProps) {
  return (
    <Accordion
      multiple
      defaultValue={["beskrivelse"]}
      className="divide-y divide-border border-t border-border"
    >
      {/* 1 — Beskrivelse (open by default so the reader sees story, not 4 closed tabs) */}
      <AccordionItem value="beskrivelse">
        <AccordionTrigger className="group flex w-full items-center gap-3 py-4 font-sans text-sm font-semibold text-foreground hover:no-underline focus-visible:outline-none">
          <FileText className="size-4 shrink-0 text-accent" aria-hidden />
          <span>Beskrivelse</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pb-4 pt-1">
            {content.description.map((block) => (
              <DescriptionBlock
                key={block.heading ?? block.body?.slice(0, 48) ?? "block"}
                block={block}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2 — Bruksveileder */}
      <AccordionItem value="bruksveileder">
        <AccordionTrigger className="group flex w-full items-center gap-3 py-4 font-sans text-sm font-semibold text-foreground hover:no-underline focus-visible:outline-none">
          <BookOpen className="size-4 shrink-0 text-accent" aria-hidden />
          <span>Bruksveileder</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1.5 pb-4 pt-1">
            {content.usageBullets.map((step) => (
              <li
                key={step.slice(0, 48)}
                className="flex items-start gap-2 font-sans text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {step}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      {/* 3 — Spesifikasjoner */}
      <AccordionItem value="spesifikasjoner">
        <AccordionTrigger className="group flex w-full items-center gap-3 py-4 font-sans text-sm font-semibold text-foreground hover:no-underline focus-visible:outline-none">
          <Package className="size-4 shrink-0 text-accent" aria-hidden />
          <span>Spesifikasjoner</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pb-4 pt-1">
            <ul className="space-y-1.5">
              {content.specs.map((spec) => (
                <li
                  key={spec.slice(0, 48)}
                  className="flex items-start gap-2 font-sans text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {spec}
                </li>
              ))}
            </ul>
            {content.specsNote && (
              <p className="mt-3 font-sans text-xs italic text-muted-foreground/70 leading-relaxed">
                {content.specsNote}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4 — Pleie og vedlikehold */}
      <AccordionItem value="pleie">
        <AccordionTrigger className="group flex w-full items-center gap-3 py-4 font-sans text-sm font-semibold text-foreground hover:no-underline focus-visible:outline-none">
          <Droplets className="size-4 shrink-0 text-accent" aria-hidden />
          <span>Pleie og vedlikehold</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1.5 pb-4 pt-1">
            {content.care.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="flex items-start gap-2 font-sans text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
