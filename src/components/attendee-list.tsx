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
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const AttendeeList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(attendees.length / 10);

  function onSearchInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function prevToPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function nextToPage() {
    if (page >= totalPage) return;
    setPage(page + 1);
  }

  function firstPage() {
    setPage(1);
  }

  function lastPage() {
    setPage(totalPage);
  }

  console.log(search);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center  gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 text-sm">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            placeholder="Buscar participantes..."
            className="h-auto flex-1 border-none bg-transparent p-0 text-sm outline-none"
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
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
              Mostrando 10 de {attendees.length} itens
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
