import { ITask } from "@/types";

const tasks: ITask[] = [
    { id: 1, name: "Initial Dishes", locationId: 6 },
    { id: 2, name: "Initial Garbage", locationId: 6 },
    { id: 3, name: "Restock items" },
    { id: 4, name: "6-Burner items to wash", desc: "Burner Crate and Head", locationId: 4 },
    { id: 5, name: "Clean Chefs tables", locationId: 4 },
    { id: 6, name: "Clean 6-burner cooker", locationId: 4 },
    { id: 7, name: "Wash dishes", desc: "Clean 6-burner items and return", locationId: 6 },
    { id: 8, name: "Drop sauces", locationId: 4 },
    { id: 9, name: "Clean sauce's burner head", locationId: 4 },
    { id: 10, name: "Wash dishes", desc: "Clean sauces pot and return", locationId: 6 },
    { id: 11, name: "Change grill's foil", locationId: 4 },
    { id: 12, name: "[BREAK]" },
    { id: 13, name: "Filter machine in the elevator", locationId: 9 },
    { id: 14, name: "Clean chefs sink", desc: "and floor sink", locationId: 4 },
    { id: 15, name: "Change garbages", locationId: 6 },
    { id: 16, name: "Sauces in the fridge", locationId: 4 },
    { id: 17, name: "Clean fridge", locationId: 3 },
    { id: 18, name: "Throw away garbages", locationId: 6 },
    { id: 19, name: "Clean sauce burner", locationId: 2 },
    { id: 20, name: "Clean doors", desc: "Restaurant Door & Fridges" },
    { id: 21, name: "Wring out the rags", locationId: 6 },
    { id: 22, name: "Clean steak burner", locationId: 5 },
    { id: 23, name: "Wash dishes", locationId: 6 },
    { id: 24, name: "Turn it off machine", locationId: 6 },
    { id: 25, name: "Throw away last garbages", locationId: 6 },
    { id: 26, name: "Clear elevator", locationId: 9 },
    { id: 27, name: "Check garbages downstairs", locationId: 9 }
];

export default tasks;