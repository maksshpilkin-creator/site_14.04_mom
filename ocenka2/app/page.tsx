import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Экспресс Оценка</h1>
          <p>Черновой Next.js-контур проекта готов к разработке.</p>
          <p>
            Основная версия сайта сейчас находится в статических
            HTML/CSS/JS-файлах.
          </p>
          <Button className="mt-2">Открыть заявку</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Нажмите <kbd>d</kbd>, чтобы переключить тему)
        </div>
      </div>
    </div>
  )
}
