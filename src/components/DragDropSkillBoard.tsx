import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useApp } from '../context/AppContext';
import { Layers, ShieldCheck, AlertTriangle, BookOpen, ThumbsUp, XCircle } from 'lucide-react';

interface SkillBoardItem {
  id: string;
  name: string;
  category: string;
  priority?: string;
}

export const DragDropSkillBoard: React.FC = () => {
  const { activeJobAnalysis, verifyUserSkill, userProfile } = useApp();
  const [verificationModalSkill, setVerificationModalSkill] = useState<string | null>(null);

  // Define initial columns based on active job analysis & user profile
  const allReqs = activeJobAnalysis?.requirements.technicalSkills || [];

  const [columns, setColumns] = useState<Record<string, SkillBoardItem[]>>(() => {
    const verified = userProfile.skills.filter(s => s.status === 'verified').map(s => ({ id: `sk-${s.name}`, name: s.name, category: s.category }));
    const needEv = activeJobAnalysis?.comparison.needEvidence.map(s => ({ id: `ne-${s.skillName}`, name: s.skillName, category: 'Need Evidence', priority: s.priority })) || [];
    const learning = userProfile.skills.filter(s => s.status === 'learning').map(s => ({ id: `l-${s.name}`, name: s.name, category: 'Learning' }));
    const missing = activeJobAnalysis?.comparison.missing.map(s => ({ id: `m-${s.skillName}`, name: s.skillName, category: 'Missing Requirement', priority: s.priority })) || [];

    return {
      'my-skills': verified.length > 0 ? verified : [{ id: 'sk-SQL', name: 'SQL', category: 'Databases' }, { id: 'sk-Python', name: 'Python', category: 'Languages' }],
      'need-evidence': needEv.length > 0 ? needEv : [{ id: 'ne-Excel', name: 'Excel', category: 'Spreadsheets' }],
      'currently-learning': learning.length > 0 ? learning : [{ id: 'l-Statistics', name: 'Statistics', category: 'Analytics' }],
      'recommended': missing.length > 0 ? missing : [{ id: 'm-Power BI', name: 'Power BI', category: 'BI' }],
      'not-relevant': []
    };
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedItem] = sourceCol.splice(source.index, 1);

    // If moving to "my-skills", prompt verification modal
    if (destination.droppableId === 'my-skills' && source.droppableId !== 'my-skills') {
      setVerificationModalSkill(movedItem.name);
    }

    destCol.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });
  };

  const columnConfig = [
    { id: 'my-skills', title: '🟢 My Verified Skills', icon: ShieldCheck, border: 'border-emerald-500/30 bg-emerald-500/5' },
    { id: 'need-evidence', title: '🟡 Need Evidence', icon: AlertTriangle, border: 'border-amber-500/30 bg-amber-500/5' },
    { id: 'currently-learning', title: '🟣 Currently Learning', icon: BookOpen, border: 'border-purple-500/30 bg-purple-500/5' },
    { id: 'recommended', title: '🔵 Recommended', icon: ThumbsUp, border: 'border-brand-500/30 bg-brand-500/5' },
    { id: 'not-relevant', title: '⚪ Not Relevant', icon: XCircle, border: 'border-slate-700 bg-slate-800/30' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-brand-400" />
            <span>Interactive Drag & Drop Skill Board</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Drag skills between status columns. Moving a skill to "My Verified Skills" requires truth verification.
          </p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {columnConfig.map(col => (
            <div key={col.id} className={`rounded-xl border ${col.border} p-3 flex flex-col min-h-[320px]`}>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">{col.title}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold">
                  {columns[col.id]?.length || 0}
                </span>
              </div>

              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-2 p-1 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'bg-brand-500/10 border border-brand-500/20' : ''
                    }`}
                  >
                    {columns[col.id]?.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded-lg border bg-slate-900 shadow-md text-xs font-medium text-white transition-transform ${
                              snapshot.isDragging ? 'rotate-2 scale-105 border-brand-500 shadow-xl' : 'border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{item.name}</span>
                              {item.priority && (
                                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-extrabold ${
                                  item.priority === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                  {item.priority}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">{item.category}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Truth Verification Modal */}
      {verificationModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Truth Verification Audit</h3>
                <p className="text-xs text-brand-400 font-semibold">Skill: {verificationModalSkill}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              "Do you actually know and have practical experience with <strong>{verificationModalSkill}</strong>?"
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  verifyUserSkill(verificationModalSkill, 'verified');
                  setVerificationModalSkill(null);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                ✓ Yes, I have applied this skill in real projects/work
              </button>

              <button
                onClick={() => {
                  verifyUserSkill(verificationModalSkill, 'learning');
                  setVerificationModalSkill(null);
                }}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                📖 I am currently learning it
              </button>

              <button
                onClick={() => {
                  setVerificationModalSkill(null);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                ✕ Cancel / Move back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
