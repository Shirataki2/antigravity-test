import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    currentSystemInstruction: string;
    onSave: (newInstruction: string) => void;
}

export function SettingsDialog({
    isOpen,
    onClose,
    currentSystemInstruction,
    onSave,
}: SettingsDialogProps) {
    const [instruction, setInstruction] = useState(currentSystemInstruction);

    useEffect(() => {
        setInstruction(currentSystemInstruction);
    }, [currentSystemInstruction, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-maid-gold/20 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-maid-bg/50">
                    <h2 className="text-lg font-semibold text-maid-primary">
                        Persona Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label
                            htmlFor="systemInstruction"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            System Instructions (Persona)
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            Define how the AI Maid should behave. You can specify her name, tone, and personality here.
                        </p>
                        <textarea
                            id="systemInstruction"
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                            className="w-full h-40 p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maid-gold/50 focus:border-maid-gold resize-none bg-gray-50"
                            placeholder="e.g., You are a polite and helpful maid named Emma..."
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(instruction);
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-maid-primary rounded-lg hover:bg-maid-primary/90 transition-colors shadow-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
