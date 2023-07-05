import { Injectable } from '@angular/core';
import { MyCustomDialogComponent } from './my-custom-dialog.component';
import { CustomDialogConfig } from './my-custom-dialog-config.interface';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
/**
 * A service used for opening a custom dialog with options specified
 */
export class MyCustomDialogService {
  alert(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private dialog: MatDialog) {}
  /**
   * Retrieves the default custom dialog config
   * @param dialogType The dialog's type
   * @returns The default custom dialog config
   */
  private _getDefaultCustomDialogConfig(
    dialogType?: 'alert' | 'confirm'
  ): CustomDialogConfig {
    return {
      dialogTitle: dialogType === 'alert' ? 'Alert' : 'Confirm',
      dialogType: dialogType ? dialogType : 'alert',
    };
  }
  /**
   * Opens an alert dialog
   * @param config Configuration options for the custom dialog
   * @param dialogConfig Configuration options for the internal dialog config
   * @returns The dialog reference of the currently-opened dialog
   */
  openAlertDialog(
    config?: CustomDialogConfig,
    dialogConfig?: MatDialogConfig<CustomDialogConfig>
  ): MatDialogRef<MyCustomDialogComponent, string> {
    let _config: CustomDialogConfig;
    let _dialogConfig: MatDialogConfig<CustomDialogConfig>;
    if (config) {
      _config = config;
      _config.dialogTitle = _config.dialogTitle || 'Alert!';
    } else {
      _config = this._getDefaultCustomDialogConfig('alert');
    }

    if (dialogConfig) {
      _dialogConfig = dialogConfig;
      if (_config && !_dialogConfig.data) {
        _dialogConfig.data = _config;
      } else {
        _dialogConfig.data = this._getDefaultCustomDialogConfig('confirm');
      }
    } else {
      _dialogConfig = {
        data: _config,
      };
    }
    _dialogConfig.width = '300px';
    return this.dialog.open<
      MyCustomDialogComponent,
      CustomDialogConfig,
      string
    >(MyCustomDialogComponent, _dialogConfig);
  }
  /**
   * Opens a confirmation dialog
   * @param config Configuration options for the custom dialog
   * @param dialogConfig Configuration options for the internal dialog config
   * @returns The dialog reference of the currently-opened dialog
   */
  openConfirmDialog(
    config?: CustomDialogConfig,
    dialogConfig?: MatDialogConfig<CustomDialogConfig>
  ): MatDialogRef<MyCustomDialogComponent, string> {
    let _config: CustomDialogConfig;
    let _dialogConfig: MatDialogConfig<CustomDialogConfig>;
    if (config) {
      _config = config;
      _config.dialogType = 'confirm';
      _config.dialogTitle = _config.dialogTitle || 'Confirm';
    } else {
      _config = this._getDefaultCustomDialogConfig('confirm');
    }

    if (dialogConfig) {
      _dialogConfig = dialogConfig;
      if (_config && !_dialogConfig.data) {
        _dialogConfig.data = _config;
      } else {
        _dialogConfig.data = this._getDefaultCustomDialogConfig('confirm');
      }
    } else {
      _dialogConfig = {
        data: _config,
      };
    }
    _dialogConfig.width = '300px';
    return this.dialog.open<
      MyCustomDialogComponent,
      CustomDialogConfig,
      string
    >(MyCustomDialogComponent, _dialogConfig);
  }
}
