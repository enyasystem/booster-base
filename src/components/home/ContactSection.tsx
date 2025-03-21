
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact & Support</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team for inquiries and support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.8843857124623!2d8.893361!3d9.940751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105373796bffffff%3A0x7c7a893daa33e4b!2sJETS%20Shopping%20Complex!5e0!3m2!1sen!2sng!4v1710861254335!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+234 803 891 3567</p>
                    <p className="text-sm text-muted-foreground">+234 802 828 9711</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@boosterbaseng.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    JETS Shopping Complex, adjacent ECWA Theological Seminary,
                    <br />Farin Gada, Jos, Plateau State, Nigeria
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Widget Placeholder */}
          <Card className="h-full">
            <CardContent className="p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Live chat coming soon!</p>
                <p className="text-sm">For immediate assistance, please call or email us.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
