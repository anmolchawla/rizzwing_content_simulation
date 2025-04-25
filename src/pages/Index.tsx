
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from '@/components/Chat';
import WhatsAppChat from '@/components/WhatsAppChat';

const Index = () => {
  return (
    <Tabs defaultValue="default" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="default">Default Chat</TabsTrigger>
        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
      </TabsList>
      <TabsContent value="default">
        <Chat />
      </TabsContent>
      <TabsContent value="whatsapp">
        <WhatsAppChat />
      </TabsContent>
    </Tabs>
  );
};

export default Index;
