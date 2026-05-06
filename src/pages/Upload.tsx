import { useState, useRef, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import { UploadCloud, FileImage, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fundus from "@/assets/fundus-scan.jpg";

export default function Upload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <main className="container pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider text-secondary font-semibold">Step 1 of 2</div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mt-2">Upload Retinal Fundus Scan</h1>
            <p className="text-muted-foreground mt-2">Securely upload a fundus image and patient details to begin AI analysis.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={`relative rounded-3xl border-2 border-dashed bg-card p-8 transition-all min-h-[420px] flex flex-col items-center justify-center text-center ${
                drag ? "border-secondary bg-secondary/5" : "border-border"
              }`}
            >
              {preview ? (
                <div className="w-full">
                  <div className="relative rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto">
                    <img src={preview} alt="Scan preview" className="w-full h-full object-cover" />
                    <button onClick={() => setPreview(null)} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-primary text-white grid place-items-center">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 text-sm font-medium flex items-center justify-center gap-2 text-success">
                    <FileImage className="h-4 w-4" /> Scan ready for analysis
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-accent grid place-items-center mb-4 shadow-glow">
                    <UploadCloud className="h-7 w-7 text-white" />
                  </div>
                  <div className="font-display font-semibold text-lg">Drop fundus image here</div>
                  <div className="text-sm text-muted-foreground mt-1">DICOM, JPEG, PNG up to 50MB</div>
                  <div className="mt-5 flex gap-2">
                    <Button onClick={() => inputRef.current?.click()} className="bg-gradient-accent text-white hover:opacity-90">Browse files</Button>
                    <Button variant="outline" onClick={() => setPreview(fundus)}>Use sample</Button>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </>
              )}
            </div>

            <div className="rounded-3xl bg-card border border-border shadow-card p-7">
              <div className="font-display font-semibold text-lg mb-5">Patient & Clinical Details</div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/result"); }}>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Patient ID</Label><Input className="mt-1.5" placeholder="P-00482" required /></div>
                  <div><Label>Age</Label><Input className="mt-1.5" type="number" placeholder="58" required /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>HbA1c (%)</Label><Input className="mt-1.5" placeholder="8.4" /></div>
                  <div><Label>BP (mmHg)</Label><Input className="mt-1.5" placeholder="142/88" /></div>
                </div>
                <div>
                  <Label>Diabetes duration (years)</Label>
                  <Input className="mt-1.5" type="number" placeholder="12" />
                </div>
                <div>
                  <Label>Eye</Label>
                  <select className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option>OD (Right)</option>
                    <option>OS (Left)</option>
                  </select>
                </div>
                <Button type="submit" disabled={!preview} size="lg" className="w-full bg-gradient-accent text-white hover:opacity-90">
                  <Sparkles className="h-4 w-4 mr-2" /> Analyze Scan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
