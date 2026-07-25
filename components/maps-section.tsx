import { MapPin, ExternalLink } from "lucide-react"

export default function MapsSection() {
  return (
    <section id="peta" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
            <MapPin className="w-3 h-3" />
            Lokasi Desa
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">Peta Desa Kendalrejo</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Desa Kendalrejo, Kecamatan Talun, Kabupaten Blitar, Jawa Timur
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
          <div className="aspect-video w-full relative">
            <iframe
              title="Peta Desa Kendalrejo, Talun, Blitar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7916.6!2d112.181!3d-8.094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78a4e9e0c3b8b5%3A0x1234567890abcdef!2sKendalrejo%2C%20Talun%2C%20Blitar%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-5 py-4 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Desa Kendalrejo, Kec. Talun, Kab. Blitar, Jawa Timur 66175</span>
            </div>
            <a
              href="https://maps.google.com/?q=Kendalrejo,Talun,Blitar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Buka di Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
