$server = Start-Process -NoNewWindow -FilePath "node" -ArgumentList "--env-file=.env.local", "dist/server.js" -PassThru
Start-Sleep 3
try {
    $result = Invoke-WebRequest -Uri "http://localhost:3000/api/tenders" -Method GET -ErrorAction Stop
    $result.Content
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__) $($_.Exception.Response.StatusDescription)"
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host "Body: $body"
    }
}
Stop-Process -Id $server.Id -Force