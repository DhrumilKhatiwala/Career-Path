import { Badge } from "@/components/ui/badge"
import type { JSX } from "react"

interface FormattedMessageProps {
  content: string
  role: "user" | "assistant"
}

export function FormattedMessage({ content, role }: FormattedMessageProps) {
  if (role === "user") {
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
  }

  const formatAIContent = (text: string) => {
    const cleanedText = text
      .replace(/\*\*([^*]+)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>") // Bold with better styling
      .replace(/\*([^*\n]+)\*/g, "<em class='italic text-foreground/90'>$1</em>") // Italic with subtle color
      .replace(/__([^_]+)__/g, "<strong class='font-semibold text-foreground'>$1</strong>") // Alternative bold
      .replace(/_([^_\n]+)_/g, "<em class='italic text-foreground/90'>$1</em>") // Alternative italic
      .replace(
        /`([^`]+)`/g,
        "<code class='bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground border'>$1</code>",
      ) // Enhanced code styling
      .replace(
        /```([^`]+)```/g,
        "<pre class='bg-muted p-3 rounded-md border text-sm font-mono overflow-x-auto my-3'><code>$1</code></pre>",
      ) // Code blocks
      .trim()

    const sections = cleanedText.split(/\n\s*\n/).filter((section) => section.trim())

    return sections.map((section, index) => {
      const trimmedSection = section.trim()

      const headingMatch = trimmedSection.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const [, hashes, headingText] = headingMatch
        const level = hashes.length
        const headingClasses = {
          1: "text-xl font-bold text-foreground mb-4 mt-6 leading-tight",
          2: "text-lg font-bold text-foreground mb-3 mt-5 leading-tight",
          3: "text-base font-semibold text-foreground mb-3 mt-4 leading-tight",
          4: "text-sm font-semibold text-foreground mb-2 mt-3 leading-tight",
          5: "text-sm font-medium text-foreground mb-2 mt-2 leading-tight",
          6: "text-xs font-medium text-foreground mb-2 mt-2 leading-tight",
        }
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        return (
          <div key={index} className="mb-1">
            <HeadingTag
              className={headingClasses[level as keyof typeof headingClasses]}
              dangerouslySetInnerHTML={{ __html: headingText }}
            />
          </div>
        )
      }

      if (/^(\d+\.|\d+\.\d+\.|\d+\.\d+\.\d+\.|[a-z]\.|[a-z]\.[a-z]\.|[ivx]+\.)/.test(trimmedSection)) {
        const items = trimmedSection
          .split(/(?=\n(?:\d+\.|\d+\.\d+\.|\d+\.\d+\.\d+\.|[a-z]\.|[a-z]\.[a-z]\.|[ivx]+\.))/)
          .filter((item) => item.trim())
        return (
          <div key={index} className="mb-4">
            <ol className="space-y-2 ml-0">
              {items.map((item, itemIndex) => {
                const match = item.match(
                  /^((?:\d+\.|\d+\.\d+\.|\d+\.\d+\.\d+\.|[a-z]\.|[a-z]\.[a-z]\.|[ivx]+\.))\s*(.+)$/s,
                )
                if (match) {
                  const [, number, content] = match
                  const getIndentLevel = (num: string) => {
                    if (/^\d+\.\d+\.\d+\./.test(num)) return 2 // Third level (1.1.1.)
                    if (/^\d+\.\d+\./.test(num)) return 1 // Second level (1.1.)
                    if (/^[a-z]\.[a-z]\./.test(num)) return 2 // Third level (a.i.)
                    if (/^[a-z]\./.test(num)) return 1 // Second level (a.)
                    if (/^[ivx]+\./.test(num)) return 1 // Second level (i.)
                    return 0 // First level (1.)
                  }

                  const indentLevel = getIndentLevel(number)
                  const marginLeft = indentLevel * 20 // 20px per level

                  return (
                    <li key={itemIndex} className="flex gap-3 items-start" style={{ marginLeft: `${marginLeft}px` }}>
                      <Badge
                        variant="outline"
                        className={`min-w-[${indentLevel > 0 ? "20px" : "24px"}] h-${indentLevel > 0 ? "5" : "6"} flex items-center justify-center text-xs font-medium bg-primary/5 border-primary/20 text-primary/80 mt-0.5 rounded-full`}
                      >
                        {number.replace(/\.$/, "")}
                      </Badge>
                      <div className="flex-1 pt-0">
                        <div
                          className="text-sm leading-[1.6] text-foreground"
                          dangerouslySetInnerHTML={{ __html: content.trim() }}
                        />
                      </div>
                    </li>
                  )
                }
                return null
              })}
            </ol>
          </div>
        )
      }

      if (/^([•\-*]|\s+[•\-*])/.test(trimmedSection)) {
        const items = trimmedSection.split(/\n(?=\s*[•\-*])/).filter((item) => item.trim())
        return (
          <div key={index} className="mb-4">
            <ul className="space-y-2 ml-0">
              {items.map((item, itemIndex) => {
                const indentMatch = item.match(/^(\s*)([•\-*])\s*(.+)$/s)
                if (indentMatch) {
                  const [, spaces, bullet, content] = indentMatch
                  const indentLevel = Math.floor(spaces.length / 2) // 2 spaces per level
                  const marginLeft = indentLevel * 16 // 16px per level

                  return (
                    <li key={itemIndex} className="flex gap-3 items-start" style={{ marginLeft: `${marginLeft}px` }}>
                      <div
                        className={`w-1.5 h-1.5 bg-primary/70 rounded-full mt-2.5 flex-shrink-0 ${indentLevel > 0 ? "bg-primary/50" : ""}`}
                      />
                      <div
                        className="text-sm leading-[1.6] text-foreground flex-1"
                        dangerouslySetInnerHTML={{ __html: content.trim() }}
                      />
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        )
      }

      const processInlineBullets = (content: string) => {
        if (content.includes("•") && !content.startsWith("•")) {
          const parts = content
            .split("•")
            .map((part) => part.trim())
            .filter((part) => part.length > 0)

          if (parts.length > 1) {
            const introText = parts[0]
            const bulletItems = parts.slice(1)

            return {
              hasInlineBullets: true,
              introText: introText.length > 10 ? introText : "",
              bulletItems: bulletItems,
            }
          }
        }
        return { hasInlineBullets: false, content }
      }

      const bulletResult = processInlineBullets(trimmedSection)
      if (bulletResult.hasInlineBullets) {
        return (
          <div key={index} className="mb-4">
            {bulletResult.introText && (
              <div
                className="text-sm leading-[1.6] text-foreground mb-3"
                dangerouslySetInnerHTML={{ __html: bulletResult.introText }}
              />
            )}
            <ul className="space-y-2 ml-0">
              {bulletResult.bulletItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full mt-2.5 flex-shrink-0" />
                  <div
                    className="text-sm leading-[1.6] text-foreground flex-1"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
      }

      if (
        (trimmedSection.length < 100 && /^[A-Z]/.test(trimmedSection) && trimmedSection.endsWith(":")) ||
        (trimmedSection.length < 60 &&
          /^[A-Z][^.]*[A-Z]/.test(trimmedSection) &&
          !trimmedSection.includes(".") &&
          trimmedSection.split(" ").length <= 8)
      ) {
        return (
          <div key={index} className="mb-3">
            <h4
              className="text-sm font-semibold text-foreground mb-2 mt-3 leading-tight"
              dangerouslySetInnerHTML={{ __html: trimmedSection.replace(/:$/, "") }}
            />
          </div>
        )
      }

      return (
        <div key={index} className="mb-4">
          <div className="text-sm leading-[1.6] text-foreground" dangerouslySetInnerHTML={{ __html: trimmedSection }} />
        </div>
      )
    })
  }

  return <div className="space-y-1">{formatAIContent(content)}</div>
}
