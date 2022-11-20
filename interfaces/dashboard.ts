export interface IDashboardSummary    {
    numberOfOrders          : number;
    paidOrders              : number;
    notPaidOrders           : number;
    numberOfClients         : number;
    numberOfProducts        : number;
    productsWithNoInventory : number;
    lowInventory            : number;
}