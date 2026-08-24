export interface NotificationItem {
  id: string;
  userId: string;
  userRole: "FARMER" | "BUYER" | "TRANSPORTER" | "FPO" | "ADMIN";
  title: string;
  message: string;
  type: "PRICE_ALERT" | "NEW_OFFER" | "COUNTER_OFFER" | "ORDER_STATUS" | "PAYMENT_UPDATE" | "TRIP_UPDATE" | "KYC_UPDATE";
  actionUrl?: string;
  isRead: boolean;
  channel: "IN_APP" | "SMS" | "WHATSAPP" | "EMAIL";
  createdAt: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    userId: "user-farmer-1",
    userRole: "FARMER",
    title: "New Direct Buyer Offer Received!",
    message: "Reliance Fresh Rural Hub offered ₹2,550/Q for 20 Quintals of Hybrid Tomato. Net Return: ₹48,600 (Top Recommended Offer).",
    type: "NEW_OFFER",
    actionUrl: "/farmer/offers",
    isRead: false,
    channel: "IN_APP",
    createdAt: "10 mins ago"
  },
  {
    id: "notif-2",
    userId: "user-farmer-1",
    userRole: "FARMER",
    title: "Market Price Alert: Tomato Surge",
    message: "Vashi APMC prices surged +12% today reaching ₹2,850/Q modal price.",
    type: "PRICE_ALERT",
    actionUrl: "/market-prices?crop=Tomato",
    isRead: false,
    channel: "WHATSAPP",
    createdAt: "1 hour ago"
  },
  {
    id: "notif-3",
    userId: "user-buyer-1",
    userRole: "BUYER",
    title: "Produce Listing Match",
    message: "Ramesh Patil (Nashik) listed 50 Quintals of Nasik Red Onion Grade-A at ₹2,400/Q.",
    type: "NEW_OFFER",
    actionUrl: "/buyer/marketplace",
    isRead: false,
    channel: "IN_APP",
    createdAt: "2 hours ago"
  },
  {
    id: "notif-4",
    userId: "user-transporter-1",
    userRole: "TRANSPORTER",
    title: "New Transport Request Available",
    message: "Order #ORD-8924 needs 5 MT Reefer haulage from Nashik to Navi Mumbai. Target pickup: 25 Aug.",
    type: "TRIP_UPDATE",
    actionUrl: "/transporter/jobs",
    isRead: false,
    channel: "SMS",
    createdAt: "3 hours ago"
  },
  {
    id: "notif-5",
    userId: "user-fpo-1",
    userRole: "FPO",
    title: "Bulk Pooling Milestone Reached",
    message: "Sahyadri Farmers Producer Co. reached 120 MT aggregated soybean pool. Ready for institutional auction.",
    type: "ORDER_STATUS",
    actionUrl: "/fpo/dashboard",
    isRead: true,
    channel: "EMAIL",
    createdAt: "1 day ago"
  }
];

class NotificationService {
  private notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];

  getForRole(role: string): NotificationItem[] {
    return this.notifications.filter(n => n.userRole === role || role === "ADMIN");
  }

  getUnreadCount(role: string): number {
    return this.getForRole(role).filter(n => !n.isRead).length;
  }

  markAsRead(id: string): void {
    const item = this.notifications.find(n => n.id === id);
    if (item) {
      item.isRead = true;
    }
  }

  markAllAsRead(role: string): void {
    this.notifications.forEach(n => {
      if (n.userRole === role || role === "ADMIN") {
        n.isRead = true;
      }
    });
  }

  addNotification(item: Omit<NotificationItem, "id" | "createdAt" | "isRead">): NotificationItem {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: "Just now"
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }
}

export const notificationService = new NotificationService();
