import { events } from "@/data/events";

export async function GET(
  request: Request,
  { params }: RouteContext<"/api/events/[id]">,
) {
  const { id } = await params;

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return Response.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }

  return Response.json(event);
}
