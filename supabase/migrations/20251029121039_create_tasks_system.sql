/*
  # TaskFlow - Систем за управљање задацима

  1. Нове табеле
    - `tasks` - Главна табела за задатке
      - `id` (uuid, primary key)
      - `title` (text) - Наслов задатка
      - `description` (text) - Опис задатка
      - `priority` (text) - Приоритет: 'висока', 'средња', 'ниска'
      - `category` (text) - Категорија: 'посао', 'лично', 'куповина', 'учење'
      - `status` (text) - Статус: 'активан', 'завршен', 'хитан'
      - `due_date` (timestamptz) - Рок за задатак
      - `due_time` (text) - Време рока
      - `progress` (integer) - Прогрес задатка (0-100)
      - `documents_count` (integer) - Број докумената
      - `participants_count` (integer) - Број учесника
      - `created_at` (timestamptz) - Време креирања
      - `completed` (boolean) - Да ли је завршен

  2. Безбедност
    - Укључен RLS на `tasks` табели
    - Полисе за јавни приступ (за демонстрацију)
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  priority text NOT NULL CHECK (priority IN ('висока', 'средња', 'ниска')),
  category text NOT NULL CHECK (category IN ('посао', 'лично', 'куповина', 'учење')),
  status text NOT NULL DEFAULT 'активан' CHECK (status IN ('активан', 'завршен', 'хитан')),
  due_date timestamptz,
  due_time text,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  documents_count integer DEFAULT 0,
  participants_count integer DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Јавни приступ за читање"
  ON tasks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Јавни приступ за додавање"
  ON tasks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Јавни приступ за ажурирање"
  ON tasks FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Јавни приступ за брисање"
  ON tasks FOR DELETE
  TO anon, authenticated
  USING (true);

-- Убацивање примера података
INSERT INTO tasks (title, description, priority, category, status, due_date, due_time) VALUES
  ('Завршити Q4 финансијски извештај', 'Прегледати све извештаје и припремити презентацију за састанак са управом', 'висока', 'посао', 'активан', CURRENT_DATE, '17:00'),
  ('Заказати преглед код зубара', 'Позвати ординацију и договорити термин за редовни контролни преглед', 'средња', 'лично', 'активан', CURRENT_DATE + INTERVAL '1 day', '10:00'),
  ('Купити намирнице за вечеру', 'Парадајз, паприка, пилетина, пиринач, салата, млеко', 'ниска', 'куповина', 'активан', CURRENT_DATE, '18:30'),
  ('Прегледати и одобрити дизајн нове странице', 'Тим дизајнера чека повратну информацију за финализацију пројекта', 'висока', 'посао', 'активан', CURRENT_DATE, '15:00'),
  ('Завршити JavaScript курс - Модул 5', 'Преостало још 3 лекције и квиз на крају модула', 'средња', 'учење', 'активан', '2025-12-03', NULL),
  ('Позвати родитеље за викенд', '', 'ниска', 'лично', 'активан', '2025-12-04', NULL),
  ('Организовати team building догађај', 'Пронаћи локацију, резервисати термин и послати позивнице тиму', 'средња', 'посао', 'активан', '2025-12-10', NULL);

-- Ажурирање података за специфичне задатке
UPDATE tasks SET documents_count = 3 WHERE title = 'Прегледати и одобрити дизајн нове странице';
UPDATE tasks SET progress = 60 WHERE title = 'Завршити JavaScript курс - Модул 5';
UPDATE tasks SET participants_count = 8 WHERE title = 'Организовати team building догађај';
