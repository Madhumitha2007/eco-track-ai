import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  HelpCircle,
  RotateCcw,
  Info,
  ShieldAlert,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { CategoryId, WasteRecord } from '../../types/waste';
import { WASTE_CATEGORIES } from '../../data/wasteCategories';
import { analyzeWasteImage, ImageAnalysisResult } from '../../utils/imageClassifier';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { addWasteRecord } from '../../utils/storage';

interface ClassifierViewProps {
  initialCategoryId?: CategoryId;
  onRecordAdded: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
  onNavigateToTracker: () => void;
}

export const ClassifierView: React.FC<ClassifierViewProps> = ({
  initialCategoryId = 'plastic',
  onRecordAdded,
  onShowToast,
  onNavigateToTracker
}) => {
  // Selected category state
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>(initialCategoryId);
  const selectedCategory = WASTE_CATEGORIES[selectedCategoryId];

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);

  // Form fields for logging directly from classifier
  const [logTitle, setLogTitle] = useState('');
  const [logQuantity, setLogQuantity] = useState(1);
  const [logUnit, setLogUnit] = useState<'kg' | 'items'>('items');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const processImageFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImagePreview(src);

      // Analyze image
      setIsAnalyzing(true);
      const img = new Image();
      img.src = src;
      img.onload = async () => {
        const res = await analyzeWasteImage(file, img);
        setAnalysisResult(res);
        setSelectedCategoryId(res.detectedCategory);
        if (!logTitle) {
          const defaultName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setLogTitle(defaultName.charAt(0).toUpperCase() + defaultName.slice(1));
        }
        setIsAnalyzing(false);
      };
    };
    reader.readAsDataURL(file);
  };

  const resetImageUpload = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLogToTracker = (e: React.FormEvent) => {
    e.preventDefault();
    const titleToUse = logTitle.trim() || `${selectedCategory.name} Item`;

    addWasteRecord({
      title: titleToUse,
      category: selectedCategoryId,
      quantity: Number(logQuantity) || 1,
      unit: logUnit,
      date: new Date().toISOString().split('T')[0],
      notes: analysisResult ? `Logged via Image Classifier (${analysisResult.confidenceScore}% confidence)` : 'Manual classification entry'
    });

    onRecordAdded();
    onShowToast('Added to Tracker!', `"${titleToUse}" saved to your waste log.`, 'success');
    setLogTitle('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Smart Classifier Engine
          </Badge>
          <Badge variant="demo">Client-Side Demo AI</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          Waste Type Identifier & Disposal Guide
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Upload an image of your item for demo visual analysis, or select a category manually to get instant municipal disposal steps and hazard safety rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Dropzone & Manual Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Image Upload Box */}
          <Card className="space-y-4 border-dashed border-2 border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Option A: Image Recognition</span>
              </h3>
              {imagePreview && (
                <button
                  onClick={resetImageUpload}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Image</span>
                </button>
              )}
            </div>

            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-slate-950 max-h-56 flex items-center justify-center border border-slate-800">
                  <img src={imagePreview} alt="Uploaded waste" className="max-h-56 object-contain" />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-emerald-400">
                      <Sparkles className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-semibold">Running Client-Side Demo Visual Analysis...</span>
                    </div>
                  )}
                </div>

                {analysisResult && (
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <Badge variant="demo" icon={<Sparkles className="w-3 h-3" />}>
                        Demo Classifier Result
                      </Badge>
                      <span className="font-mono text-emerald-400 font-bold">
                        {analysisResult.confidenceScore}% Confidence
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium">
                      Detected Stream:{' '}
                      <span className="text-white font-bold">{WASTE_CATEGORIES[analysisResult.detectedCategory]?.name}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {analysisResult.detectedFeatures.map((feat, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-amber-300/80 italic pt-1 border-t border-slate-800">
                      Note: Demo image analysis uses browser canvas heuristics. You can override the category manually below at any time.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="py-10 px-4 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/40 hover:bg-slate-900/60 cursor-pointer transition-colors space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Click to upload or drag & drop waste image
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supports JPG, PNG, WEBP (Client-Side Demo Visual Classifier)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </Card>

          {/* Manual Category Selector Box */}
          <Card className="space-y-4">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Option B: Select Category Manually</span>
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(WASTE_CATEGORIES) as CategoryId[]).map((catId) => {
                const cat = WASTE_CATEGORIES[catId];
                const isSelected = selectedCategoryId === catId;
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      setSelectedCategoryId(catId);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? `${cat.bgColor} ${cat.borderColor} text-white shadow-glow-sm border-emerald-500/50`
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${cat.bgColor} flex items-center justify-center text-emerald-400`}>
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{cat.name}</div>
                        <div className="text-[10px] text-slate-400">{cat.streamName}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Detailed Category Breakdown & Disposal Instructions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Selected Category Card */}
          <Card className={`space-y-6 border-l-4 ${selectedCategory.borderColor} bg-slate-900/90`}>
            
            {/* Category Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={(selectedCategory.color as any) || 'emerald'} size="md">
                    {selectedCategory.streamName}
                  </Badge>
                  {selectedCategory.isSpecialDisposal && (
                    <Badge variant="rose" size="sm" icon={<AlertTriangle className="w-3 h-3" />}>
                      Special Facility Required
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl font-black text-white mt-2">{selectedCategory.name}</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedCategory.description}</p>
              </div>
            </div>

            {/* Critical Hazard Warning Alert if applicable */}
            {selectedCategory.hazardWarning && (
              <div className="bg-rose-950/80 border border-rose-500/40 p-4 rounded-xl flex items-start gap-3 text-rose-200 text-xs shadow-lg">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-rose-300 block">HAZARD WARNING:</span>
                  <p className="leading-relaxed">{selectedCategory.hazardWarning}</p>
                </div>
              </div>
            )}

            {/* Examples Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Common Items in this Category:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategory.examples.map((ex, idx) => (
                  <span key={idx} className="bg-slate-800/80 text-slate-300 text-xs px-3 py-1 rounded-lg border border-slate-700/60 font-medium">
                    • {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Disposal Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Correct Disposal Instructions:
              </h4>
              <ul className="space-y-2.5">
                {selectedCategory.disposalInstructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Log to Waste Tracker Card Form */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-emerald-500/30 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Log this item to your Waste Tracker</span>
                </h4>
                <span className="text-[11px] text-slate-400">Saves to LocalStorage</span>
              </div>

              <form onSubmit={handleLogToTracker} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Item Title / Description</label>
                  <input
                    type="text"
                    required
                    placeholder={`e.g. ${selectedCategory.examples[0]}`}
                    value={logTitle}
                    onChange={(e) => setLogTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Quantity</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    value={logQuantity}
                    onChange={(e) => setLogQuantity(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Unit</label>
                  <select
                    value={logUnit}
                    onChange={(e) => setLogUnit(e.target.value as 'kg' | 'items')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="items">Items</option>
                    <option value="kg">Kilograms (kg)</option>
                  </select>
                </div>

                <div className="sm:col-span-12 flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={onNavigateToTracker}
                    className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    <span>View All Saved Records</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-glow-sm"
                  >
                    <PlusCircle className="w-4 h-4 text-slate-950" />
                    <span>Save to Tracker</span>
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
