import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

type Attendee = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
};

export const AttendeeList = () => {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search"))
      return url.searchParams.get("search") ?? "";
    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page"))
      return Number(url.searchParams.get("page"));
    return 1;
  });

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const totalPage = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees",
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);
    setPage(page);
  }

  function onSearchInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
    setCurrentPage(1);
  }

  function prevToPage() {
    if (page === 1) return;
    setCurrentPage(page - 1);
  }

  function nextToPage() {
    if (page >= totalPage) return;
    setCurrentPage(page + 1);
  }

  function firstPage() {
    setCurrentPage(1);
  }

  function lastPage() {
    setCurrentPage(totalPage);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center  gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 text-sm">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            placeholder="Buscar participantes..."
            className="h-auto flex-1 border-none bg-transparent p-0 text-sm outline-none focus:ring-0"
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow className="border-b border-white/10">
            <TableHeader
              style={{ width: 48 }}
              className="px-4 py-3 text-left text-sm font-semibold"
            >
              <input
                type="checkbox"
                className="size-4 rounded border border-white/10 bg-black/20"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader
              style={{ width: 64 }}
              className="px-4 py-3 text-left text-sm font-semibold"
            ></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 rounded border border-white/10 bg-black/20"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-500">Não fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell
              colSpan={3}
              className="px-4 py-3 text-right text-sm text-zinc-300"
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPage}
                </span>
                <div className="flex gap-1.5">
                  <IconButton disabled={page === 1} onClick={firstPage}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === 1} onClick={prevToPage}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    disabled={page === totalPage}
                    onClick={nextToPage}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === totalPage} onClick={lastPage}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
};
