import { Button } from "@/components/ui/button";
interface BackupRecoveryProps {
  onBackupWallet: () => void;
}
export function BackupRecovery({
  onBackupWallet
}: BackupRecoveryProps) {
  return <section>
      <h2 className="text-lg font-medium mb-2">Backup & Recovery</h2>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-4 rounded-xl">
          <Button className="w-full" onClick={onBackupWallet}>
            Backup Wallet Now
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Last backup: Never
          </p>
        </div>
      </div>
    </section>;
}