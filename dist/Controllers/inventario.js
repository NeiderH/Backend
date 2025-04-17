"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// obtener todos los platos
// export const GetInventario = async (req: Request, res: Response) => {
//   try {
//     const listainv = await Inventario.findAll(
//       {
//         order: [['id_inv', 'DESC']],
//       }
//     );
//     console.log("📌 Inventario encontrado:", listainv);
//     if (listainv.length === 0) {
//       console.warn("⚠️ No hay Inventarios en la base de datos.");
//     }
//     res.json(listainv);
//   } catch (error) {
//     console.error("❌ Error al obtener Inventario:", error);
//     res.status(500).json({ message: "Error al obtener los Inventarios" });
//   }
// };
