import { Checkbox } from "@/components/ui/checkbox";
interface SecurityScoreProps {
  score: number;
}
export function SecurityScore({
  score
}: SecurityScoreProps) {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  return <div className="p-4 border bg-card rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Security Score</h3>
        <span className="font-bold">{score}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className={`h-2 rounded-full ${getScoreColor()}`} style={{
        width: `${score}%`
      }} />
      </div>
      <div className="mt-3 text-sm">
        <div className="flex items-center">
          <Checkbox id="recovery" className="mr-2" checked disabled />
          <label htmlFor="recovery" className="text-muted-foreground">Recovery phrase backed up</label>
        </div>
        <div className="flex items-center mt-1">
          <Checkbox id="auth" className="mr-2" checked={false} disabled />
          <label htmlFor="auth" className="text-muted-foreground">2FA enabled</label>
        </div>
      </div>
    </div>;
}